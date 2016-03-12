; (function () {
    "use strict";

    var CoursesTutorsController = function ($scope, $rootScope, $data, $q, $jsnbt, $logger, ModalService, AuthService) {
        jsnbt.controllers.DataListControllerBase.apply(this, $rootScope.getBaseArguments($scope));

        var logger = $logger.create('CoursesTutorsController');

        $scope.canViewSettings = function () {
            return AuthService.isInRole($scope.current.user, 'sa');
        };

        $scope.viewSettings = function () {
            $scope.route.next('/modules/courses/tutors/settings');
        };

        this.init().catch(function (ex) {
            logger.error(ex);
        });

    };
    CoursesTutorsController.prototype = Object.create(jsnbt.controllers.DataListControllerBase.prototype);

    angular.module("jsnbt-courses")
        .controller('CoursesTutorsController', ['$scope', '$rootScope', '$data', '$q', '$jsnbt', '$logger', 'ModalService', 'AuthService', CoursesTutorsController]);
})();