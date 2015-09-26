;(function () {
    "use strict";
    
    var CoursesSetsController = function ($scope, $route, $rootScope, $location, $data, $jsnbt, $q, ModalService, PagedDataService, CoursesSetService) {
        jsnbt.ListControllerBase.apply(this, $scope.getBaseArguments($scope));
        
        $scope.prefix = $route.current.$$route.location ? $route.current.$$route.location.prefix : undefined;
        
        $scope.load = function () {
            var deferred = $q.defer();

            PagedDataService.get(jsnbt.db.nodes.get, {
                parent: '',
                entity: 'courseSet'
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

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

        $scope.gridFn.canOpen = function (node) {
            return true;
        };

        $scope.gridFn.open = function (node) {
            var url = $jsnbt.entities[node.entity].getViewUrl(node, $scope.prefix);
            $location.next(url);
        };

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

            CoursesSetService.delete(node).then(function (deleted) {
                if (deleted) {
                    $scope.remove(node);
                }
            }).catch(function (ex) {
                throw ex;
            });
        };

        $scope.init();

    };
    CoursesSetsController.prototype = Object.create(jsnbt.ListControllerBase.prototype);

    angular.module("jsnbt-courses")
        .controller('CoursesSetsController', ['$scope', '$route', '$rootScope', '$location', '$data', '$jsnbt', '$q', 'ModalService', 'PagedDataService', 'CoursesSetService', CoursesSetsController]);
})();