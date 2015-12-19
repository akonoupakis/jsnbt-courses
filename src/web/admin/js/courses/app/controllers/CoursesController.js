;(function () {
    "use strict";
    
    var CoursesCoursesController = function ($scope, $rootScope, $route, $routeParams, $location, $data, $q, $jsnbt, $logger, ModalService, PagedDataService, CoursesSetService, CoursesCourseService, AuthService) {
        jsnbt.controllers.ListControllerBase.apply(this, $rootScope.getBaseArguments($scope));

        var self = this;
        
        var logger = $logger.create('CoursesCoursesController');

        $scope.id = $routeParams.id;
        $scope.parent = undefined;

        $scope.title = '';

        this.enqueue('watch', '', function () {
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
            return AuthService.isAuthorized($scope.current.user, 'nodes:course', 'C');
        };

        $scope.create = function () {
            var url = $jsnbt.entities['course'].getCreateUrl($scope.parent, $scope.prefix);
            $location.next(url);
        };

        $scope.canEdit = function () {
            return AuthService.isAuthorized($scope.current.user, 'nodes:courseSet', 'U');
        };

        $scope.edit = function () {
            var url = $jsnbt.entities[$scope.parent.entity].getEditUrl($scope.parent, $scope.prefix);
            $location.next(url);
        };

        $scope.canDelete = function () {
            return AuthService.isAuthorized($scope.current.user, 'nodes:courseSet', 'D');
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
                return AuthService.isAuthorized($scope.current.user, 'nodes:' + $scope.entity, 'R');
            },

            open: function (node) {
                var url = $jsnbt.entities[node.entity].getViewUrl(node, $scope.prefix);
                $location.next(url);
            },

            canEdit: function (node) {
                return AuthService.isAuthorized($scope.current.user, 'nodes:' + $scope.entity, 'U');
            },

            edit: function (node) {
                var url = $jsnbt.entities[node.entity].getEditUrl(node, $scope.prefix);
                $location.next(url);
            },

            canDelete: function (node) {
                return AuthService.isAuthorized($scope.current.user, 'nodes:' + $scope.entity, 'D');
            },

            delete: function (node) {
                CoursesCourseService.delete(node).then(function (deleted) {
                    if (deleted) {
                        self.remove(node);
                    }
                }).catch(function (ex) {
                    throw ex;
                });
            }
        }

        this.init().catch(function (ex) {
            logger.error(ex);
        });

    };
    CoursesCoursesController.prototype = Object.create(jsnbt.controllers.ListControllerBase.prototype);

    CoursesCoursesController.prototype.load = function () {
        var self = this;

        var loadParent = function () {
            var deferred = self.ctor.$q.defer();

            self.ctor.$data.nodes.get(self.scope.id).then(function (response) {
                self.scope.parent = response;
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        var loadData = function () {
            var deferred = self.ctor.$q.defer();

            self.ctor.PagedDataService.get(self.ctor.$jsnbt.db.nodes.get, {
                parent: self.scope.id,
                entity: 'course'
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        var d = self.ctor.$q.defer();

        self.ctor.$q.all([loadParent(), loadData()]).then(function (results) {
            var parentResult = results[0];
            var dataResults = results[1];
            d.resolve(dataResults);
        }, function (ex) {
            d.reject(ex);
        });

        return d.promise;
    };

    CoursesCoursesController.prototype.getBreadcrumb = function () {
        var deferred = this.ctor.$q.defer();

        var self = this;

        jsnbt.controllers.ListControllerBase.prototype.getBreadcrumb.apply(this, arguments).then(function (breadcrumb) {

            var offset = _.str.trim(self.scope.prefix || '', '/').split('/').length;

            if (self.scope.prefix === '/content/nodes/courses') {
                offset--;
            }

            if (self.scope.prefix === '/modules/courses') {
                offset++;
                breadcrumb[offset - 1].name = 'sets';
                breadcrumb[offset - 1].url = '/modules/courses/sets';
            }

            breadcrumb.splice(offset);

            breadcrumb.push({
                active: true,
                name: self.scope.title
            });

            deferred.resolve(breadcrumb);

        }).catch(function (ex) {
            deferred.reject(ex);
        });

        return deferred.promise;
    };

    angular.module("jsnbt-courses")
        .controller('CoursesCoursesController', ['$scope', '$rootScope', '$route', '$routeParams', '$location', '$data', '$q', '$jsnbt', '$logger', 'ModalService', 'PagedDataService', 'CoursesSetService', 'CoursesCourseService', 'AuthService', CoursesCoursesController]);
})();