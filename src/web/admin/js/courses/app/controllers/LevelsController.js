;(function () {
    "use strict";
    
    var CoursesLevelsController = function ($scope, $rootScope, $route, $routeParams, $location, $data, $q, $jsnbt, $logger, ModalService, PagedDataService, CoursesCourseService, CoursesLevelService) {
        jsnbt.controllers.ListControllerBase.apply(this, $rootScope.getBaseArguments($scope));

        var self = this;
        
        var logger = $logger.create('CoursesLevelsController');

        $scope.id = $routeParams.id;
        $scope.parent = undefined;

        $scope.offset = _.str.trim($scope.prefix || '', '/').split('/').length;
        
        this.enqueue('loading', function () {
            var deferred = $q.defer();

            $data.nodes.get($scope.id).then(function (response) {
                $scope.parent = response;
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        });
        
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
                        self.remove(node);
                    }
                }).catch(function (ex) {
                    throw ex;
                });

            }
        };

        this.init().catch(function (ex) {
            logger.error(ex);
        });

    };
    CoursesLevelsController.prototype = Object.create(jsnbt.controllers.ListControllerBase.prototype);

    CoursesLevelsController.prototype.load = function () {
        var deferred = this.ctor.$q.defer();

        this.ctor.PagedDataService.get(this.ctor.$jsnbt.db.nodes.get, {
            parent: this.scope.id,
            entity: 'courseLevel'
        }).then(function (response) {
            deferred.resolve(response);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    CoursesLevelsController.prototype.getBreadcrumb = function () {
        var deferred = this.ctor.$q.defer();

        var self = this;

        jsnbt.controllers.ListControllerBase.prototype.getBreadcrumb.apply(this, arguments).then(function (breadcrumb) {

            self.scope.getNodeBreadcrumb(self.scope.parent, self.scope.prefix).then(function (bc) {

                var offset = self.scope.offset;
                var remaining = 1;
                if (self.scope.prefix === '/content/nodes/courses' && self.scope.offset === 3) {
                    offset--;
                    remaining++;
                }

                breadcrumb.splice(offset);

                if (self.scope.prefix === '/modules/courses') {
                    breadcrumb.push({
                        name: 'sets',
                        url: '/modules/courses/sets'
                    });
                }

                _.each(bc, function (c) {
                    breadcrumb.push(c);
                });

                deferred.resolve(breadcrumb);

            }, function (ex) {
                deferred.reject(ex);
            });

        }).catch(function (ex) {
            deferred.reject(ex);
        });

        return deferred.promise;
    };

    angular.module("jsnbt-courses")
        .controller('CoursesLevelsController', ['$scope', '$rootScope', '$route', '$routeParams', '$location', '$data', '$q', '$jsnbt', '$logger', 'ModalService', 'PagedDataService', 'CoursesCourseService', 'CoursesLevelService', CoursesLevelsController]);
})();