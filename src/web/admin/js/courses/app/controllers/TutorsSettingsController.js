;(function () {
    "use strict";

    var CoursesTutorsSettingsController = function ($scope, $location, $jsnbt) {
        jsnbt.SettingsControllerBase.apply(this, $scope.getBaseArguments($scope));

        $scope.back = function () {
            $location.previous('/modules/courses/tutors');
        };
        
        $scope.init();
    };
    CoursesTutorsSettingsController.prototype = Object.create(jsnbt.SettingsControllerBase.prototype);

    angular.module("jsnbt-courses")
        .controller('CoursesTutorsSettingsController', ['$scope', '$location', '$jsnbt', CoursesTutorsSettingsController]);

})();