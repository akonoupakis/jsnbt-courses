; (function () {
    "use strict";

    var CoursesTutorsController = function ($scope, $rootScope, $route, $routeParams, $location, $data, $q, $jsnbt, $logger, ModalService, PagedDataService) {
        jsnbt.controllers.DataListControllerBase.apply(this, $rootScope.getBaseArguments($scope));

        var logger = $logger.create('CoursesTutorsController');

        $scope.canViewSettings = function () {
            return true;
        };

        $scope.viewSettings = function () {
            $location.next('/modules/courses/tutors/settings');
        };

        this.init().catch(function (ex) {
            logger.error(ex);
        });

    };
    CoursesTutorsController.prototype = Object.create(jsnbt.controllers.DataListControllerBase.prototype);

    angular.module("jsnbt-courses")
        .controller('CoursesTutorsController', ['$scope', '$rootScope', '$route', '$routeParams', '$location', '$data', '$q', '$jsnbt', '$logger', 'ModalService', 'PagedDataService', CoursesTutorsController]);
})();