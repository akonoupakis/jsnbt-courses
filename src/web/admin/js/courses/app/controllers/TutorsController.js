;(function () {
    "use strict";
    
    var CoursesTutorsController = function ($scope, $route, $rootScope, $routeParams, $location, $data, $q, $jsnbt, ModalService, PagedDataService) {
        jsnbt.DataListControllerBase.apply(this, $scope.getBaseArguments($scope));
        
        $scope.canViewSettings = function () {
            return true;
        };

        $scope.viewSettings = function () {
            $location.next('/modules/courses/tutors/settings');
        };

        $scope.init();

    };
    CoursesTutorsController.prototype = Object.create(jsnbt.DataListControllerBase.prototype);

    angular.module("jsnbt-courses")
        .controller('CoursesTutorsController', ['$scope', '$route', '$rootScope', '$routeParams', '$location', '$data', '$q', '$jsnbt', 'ModalService', 'PagedDataService', CoursesTutorsController]);
})();