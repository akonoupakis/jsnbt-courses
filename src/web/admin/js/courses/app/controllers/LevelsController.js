;(function () {
    "use strict";
    
    var CoursesLevelsController = function ($scope, $route, $rootScope, $routeParams, $location, $data, $q, $jsnbt, $logger, ModalService, PagedDataService, CoursesCourseService, CoursesLevelService) {
        jsnbt.ListControllerBase.apply(this, $scope.getBaseArguments($scope));
        
        var logger = $logger.create('CoursesLevelsController');

        $scope.id = $routeParams.id;
        $scope.parent = undefined;

        $scope.offset = _.str.trim($scope.prefix || '', '/').split('/').length;
        
        $scope.enqueue('loading', function () {
            var deferred = $q.defer();

            $data.nodes.get($scope.id).then(function (response) {
                $scope.parent = response;
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        });

        $scope.load = function () {
            var deferred = $q.defer();

            PagedDataService.get(jsnbt.db.nodes.get, {
                parent: $scope.id,
                entity: 'courseLevel'
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        var getBreadcrumbFn = $scope.getBreadcrumb;
        $scope.getBreadcrumb = function () {
            var deferred = $q.defer();

            getBreadcrumbFn.apply(this, arguments).then(function (response) {
                $scope.getNodeBreadcrumb($scope.parent, $scope.prefix).then(function (bc) {

                    var offset = $scope.offset;
                    var remaining = 1;
                    if ($scope.prefix === '/content/nodes/courses' && $scope.offset === 3) {
                        offset--;
                        remaining++;
                    }

                    response.splice(offset);

                    if ($scope.prefix === '/modules/courses') {
                        response.push({
                            name: 'sets',
                            url: '/modules/courses/sets'
                        });
                    }

                    _.each(bc, function (c) {
                        response.push(c);
                    });

                    deferred.resolve(response);

                }, function (ex) {
                    deferred.reject(ex);
                });
            }).catch(function (ex) {
                deferred.reject(ex);
            });

            return deferred.promise;
        };

        $scope.$watch('parent.title', function () {
            if (!$scope.parent)
                return;

            $scope.title = $scope.parent.title[$scope.defaults.language];
        });

        $scope.canCreate = function () {
            return true;
        };

        $scope.create = function () {
            var url = $jsnbt.entities['courseLevel'].getCreateUrl($scope.parent, $scope.prefix);
            $location.next(url);
        };

        $scope.canEdit = function () {
            return true;
        };

        $scope.edit = function () {
            var url = $jsnbt.entities[$scope.parent.entity].getEditUrl($scope.parent, $scope.prefix);
            $location.next(url);
        };

        $scope.canDelete = function () {
            return true;
        };

        $scope.delete = function () {
            CoursesCourseService.delete($scope.parent).then(function (deleted) {
                if (deleted) {
                    $scope.back();
                }
            }).catch(function (ex) {
                throw ex;
            });
        }

        $scope.gridFn = {
            canEdit: function (node) {
                return true;
            },

            edit: function (node) {
                var url = $jsnbt.entities[node.entity].getEditUrl(node, $scope.prefix);
                $location.next(url);
            },

            canDelete: function (node) {
                return true;
            },

            delete: function (node) {

                CoursesCourseService.delete(node).then(function (deleted) {
                    if (deleted) {
                        $scope.remove(node);
                    }
                }).catch(function (ex) {
                    throw ex;
                });

            }
        };

        $scope.init().catch(function (ex) {
            logger.error(ex);
        });

    };
    CoursesLevelsController.prototype = Object.create(jsnbt.ListControllerBase.prototype);

    angular.module("jsnbt-courses")
        .controller('CoursesLevelsController', ['$scope', '$route', '$rootScope', '$routeParams', '$location', '$data', '$q', '$jsnbt', '$logger', 'ModalService', 'PagedDataService', 'CoursesCourseService', 'CoursesLevelService', CoursesLevelsController]);
})();