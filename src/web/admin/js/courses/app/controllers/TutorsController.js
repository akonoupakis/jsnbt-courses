﻿;(function () {
    "use strict";
    
    var CoursesTutorsController = function ($scope, $rootScope, $route, $routeParams, $location, $data, $q, $jsnbt, ModalService, PagedDataService) {
        jsnbt.controllers.DataListControllerBase.apply(this, $rootScope.getBaseArguments($scope));
        
        $scope.canViewSettings = function () {
            return true;
        };

        $scope.viewSettings = function () {
            $location.next('/modules/courses/tutors/settings');
        };

        $scope.init();

    };
    CoursesTutorsController.prototype = Object.create(jsnbt.controllers.DataListControllerBase.prototype);

    angular.module("jsnbt-courses")
        .controller('CoursesTutorsController', ['$scope', '$rootScope', '$route', '$routeParams', '$location', '$data', '$q', '$jsnbt', 'ModalService', 'PagedDataService', CoursesTutorsController]);
})();