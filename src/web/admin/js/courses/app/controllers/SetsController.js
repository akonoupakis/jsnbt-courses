;(function () {
    "use strict";
    
    var CoursesSetsController = function ($scope, $rootScope, $route, $location, $data, $jsnbt, $q, $logger, ModalService, PagedDataService, CoursesSetService) {
        jsnbt.controllers.ListControllerBase.apply(this, $rootScope.getBaseArguments($scope));

        var self = this;
        
        var logger = $logger.create('CoursesSetsController');
        
        $scope.canViewSettings = function () {
            return true;
        };

        $scope.viewSettings = function () {
            $location.next('/modules/courses/sets/settings');
        };

        $scope.canCreate = function () {
            return true;
        };

        $scope.create = function () {
            var url = $jsnbt.entities['courseSet'].getCreateUrl(undefined, $scope.prefix);
            $location.next(url);
        };

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

                CoursesSetService.delete(node).then(function (deleted) {
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
    CoursesSetsController.prototype = Object.create(jsnbt.controllers.ListControllerBase.prototype);

    CoursesSetsController.prototype.load = function () {
        var deferred = this.ctor.$q.defer();

        this.ctor.PagedDataService.get(this.ctor.$jsnbt.db.nodes.get, {
            parent: '',
            entity: 'courseSet'
        }).then(function (response) {
            deferred.resolve(response);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    angular.module("jsnbt-courses")
        .controller('CoursesSetsController', ['$scope', '$rootScope', '$route', '$location', '$data', '$jsnbt', '$q', '$logger', 'ModalService', 'PagedDataService', 'CoursesSetService', CoursesSetsController]);
})();