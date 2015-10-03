;(function () {
    "use strict";

    var SettingsController = function ($scope, $rootScope, $location, $jsnbt) {
        jsnbt.controllers.SettingsControllerBase.apply(this, $rootScope.getBaseArguments($scope));

        $scope.init();
    };
    SettingsController.prototype = Object.create(jsnbt.controllers.SettingsControllerBase.prototype);

    angular.module("jsnbt-courses")
        .controller('CoursesCoursesSettingsController', ['$scope', '$rootScope', '$location', '$jsnbt', SettingsController]);

})();