;(function () {
    "use strict";

    var CoursesCoursesSettingsController = function ($scope, $location, $jsnbt) {
        jsnbt.SettingsControllerBase.apply(this, $scope.getBaseArguments($scope));

        $scope.back = function () {
            $location.previous('/modules/courses/sets');
        };
        
        $scope.init();
    };
    CoursesCoursesSettingsController.prototype = Object.create(jsnbt.SettingsControllerBase.prototype);

    angular.module("jsnbt-courses")
        .controller('CoursesCoursesSettingsController', ['$scope', '$location', '$jsnbt', CoursesCoursesSettingsController]);

})();