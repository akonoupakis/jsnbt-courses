;(function () {
    "use strict";
    
    var CoursesSetsController = function ($scope, $rootScope, $data, $jsnbt, $q, $logger, ModalService, AuthService, PagedDataService, CoursesSetService) {
        jsnbt.controllers.ListControllerBase.apply(this, $rootScope.getBaseArguments($scope));

        var self = this;
        
        var logger = $logger.create('CoursesSetsController');
        
        $scope.canViewSettings = function () {
            return AuthService.isInRole($scope.current.user, 'sa');
        };

        $scope.viewSettings = function () {
            $scope.route.next('/modules/courses/sets/settings');
        };

        $scope.canCreate = function () {
            return AuthService.isAuthorized($scope.current.user, 'nodes:courseSet', 'C');
        };

        $scope.create = function () {
            var url = $jsnbt.entities['courseSet'].getCreateUrl(undefined, $scope.prefix);
            $scope.route.next(url);
        };

        $scope.gridFn = {
            canOpen: function (node) {
                return AuthService.isAuthorized($scope.current.user, 'nodes:' + node.entity, 'R');
            },

            open: function (node) {
                var url = $jsnbt.entities[node.entity].getViewUrl(node, $scope.prefix);
                $scope.route.next(url);
            },

            canEdit: function (node) {
                return AuthService.isAuthorized($scope.current.user, 'nodes:' + node.entity, 'U');
            },

            edit: function (node) {
                var url = $jsnbt.entities[node.entity].getEditUrl(node, $scope.prefix);
                $scope.route.next(url);
            },

            canDelete: function (node) {
                return AuthService.isAuthorized($scope.current.user, 'nodes:' + node.entity, 'D');
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

        this.ctor.PagedDataService.get({
            fn: this.ctor.$jsnbt.db.nodes,
            query: {
                parent: '',
                entity: 'courseSet'
            }
        }).then(function (response) {
            deferred.resolve(response);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    angular.module("jsnbt-courses")
        .controller('CoursesSetsController', ['$scope', '$rootScope', '$data', '$jsnbt', '$q', '$logger', 'ModalService', 'AuthService', 'PagedDataService', 'CoursesSetService', CoursesSetsController]);
})();