;(function () {
    "use strict";
    
    var CoursesLevelsController = function ($scope, $route, $rootScope, $routeParams, $location, $data, $q, $jsnbt, ModalService, PagedDataService, CoursesCourseService, CoursesLevelService) {
        jsnbt.ListControllerBase.apply(this, $scope.getBaseArguments($scope));
        
        $scope.id = $routeParams.id;
        $scope.parent = undefined;
        $scope.prefix = $route.current.$$route.location ? $route.current.$$route.location.prefix : undefined;
        $scope.offset = _.str.trim($scope.prefix || '', '/').split('/').length;

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
                    entity: 'courseLevel'
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

        var setLocationFn = $scope.setLocation;
        $scope.setLocation = function () {
            var deferred = $q.defer();

            setLocationFn.apply(this, arguments).then(function (response) {
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
            $scope.setLocation();
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

        $scope.gridFn.canEdit = function (node) {
            return true;
        };

        $scope.gridFn.edit = function (node) {
            var url = $jsnbt.entities[node.entity].getEditUrl(node, $scope.prefix);
            $location.next(url);
        };

        $scope.gridFn.canDelete = function (node) {
            return true;
        };

        $scope.gridFn.delete = function (node) {

            CoursesCourseService.delete(node).then(function (deleted) {
                if (deleted) {
                    $scope.remove(node);
                }
            }).catch(function (ex) {
                throw ex;
            });

        };

        $scope.init();

    };
    CoursesLevelsController.prototype = Object.create(jsnbt.ListControllerBase.prototype);

    angular.module("jsnbt-courses")
        .controller('CoursesLevelsController', ['$scope', '$route', '$rootScope', '$routeParams', '$location', '$data', '$q', '$jsnbt', 'ModalService', 'PagedDataService', 'CoursesCourseService', 'CoursesLevelService', CoursesLevelsController]);
})();