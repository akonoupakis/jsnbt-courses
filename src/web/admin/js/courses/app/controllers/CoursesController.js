;(function () {
    "use strict";
    
    var CoursesCoursesController = function ($scope, $route, $rootScope, $routeParams, $location, $data, $q, $jsnbt, $logger, ModalService, PagedDataService, CoursesSetService, CoursesCourseService) {
        jsnbt.controllers.ListControllerBase.apply(this, $scope.getBaseArguments($scope));
        
        var logger = $logger.create('CoursesCoursesController');

        $scope.id = $routeParams.id;
        $scope.parent = undefined;

        $scope.title = '';

        $scope.load = function () {
            var loadParent = function () {
                var deferred = $q.defer();

                $data.nodes.get($scope.id).then(function (response) {
                    $scope.parent = response;
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            };

            var loadData = function () {
                var deferred = $q.defer();

                PagedDataService.get(jsnbt.db.nodes.get, {
                    parent: $scope.id,
                    entity: 'course'
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            };

            var d = $q.defer();

            $q.all([loadParent(), loadData()]).then(function (results) {
                var parentResult = results[0];
                var dataResults = results[1];
                d.resolve(dataResults);
            }, function (ex) {
                d.reject(ex);
            });

            return d.promise;
        };

        var getBreadcrumbFn = $scope.getBreadcrumb;
        $scope.getBreadcrumb = function () {
            var deferred = $q.defer();

            getBreadcrumbFn.apply(this, arguments).then(function (response) {

                var offset = _.str.trim($scope.prefix || '', '/').split('/').length;;

                if ($scope.prefix === '/content/nodes/courses') {
                    offset--;
                }

                if ($scope.prefix === '/modules/courses') {
                    offset++;
                    response[offset - 1].name = 'sets';
                    response[offset - 1].url = '/modules/courses/sets';
                }

                response.splice(offset);

                response.push({
                    active: true,
                    name: $scope.title
                });
                
                deferred.resolve(response);

            }).catch(function (ex) {
                deferred.reject(ex);
            });

            return deferred.promise;
        };

        $scope.enqueue('watch', function () {
            var deferred = $q.defer();

            $scope.$watch('parent.title', function () {
                if (!$scope.parent)
                    return;

                $scope.title = $scope.parent.title[$scope.defaults.language];
            });

            deferred.resolve();

            return deferred.promise;
        });

        $scope.canCreate = function () {
            return true;
        };

        $scope.create = function () {
            var url = $jsnbt.entities['course'].getCreateUrl($scope.parent, $scope.prefix);
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
            CoursesSetService.delete($scope.parent).then(function (deleted) {
                if (deleted) {
                    $scope.back();
                }
            }).catch(function (ex) {
                throw ex;
            });
        }

        $scope.gridFn = {
            canOpen: function (node) {
                return true;
            },

            open: function (node) {
                var url = $jsnbt.entities[node.entity].getViewUrl(node, $scope.prefix);
                $location.next(url);
            },

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
        }

        $scope.init().catch(function (ex) {
            logger.error(ex);
        });

    };
    CoursesCoursesController.prototype = Object.create(jsnbt.controllers.ListControllerBase.prototype);

    angular.module("jsnbt-courses")
        .controller('CoursesCoursesController', ['$scope', '$route', '$rootScope', '$routeParams', '$location', '$data', '$q', '$jsnbt', '$logger', 'ModalService', 'PagedDataService', 'CoursesSetService', 'CoursesCourseService', CoursesCoursesController]);
})();