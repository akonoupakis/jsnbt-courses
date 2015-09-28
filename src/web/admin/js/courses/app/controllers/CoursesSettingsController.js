;(function () {
    "use strict";

    var SettingsController = function ($scope, $location, $jsnbt) {
        jsnbt.SettingsControllerBase.apply(this, $scope.getBaseArguments($scope));

        $scope.init();
    };
    SettingsController.prototype = Object.create(jsnbt.SettingsControllerBase.prototype);

    angular.module("jsnbt-courses")
        .controller('CoursesCoursesSettingsController', ['$scope', '$location', '$jsnbt', SettingsController]);

})();