;(function () {
    "use strict";

    var SettingsController = function ($scope, $location, $jsnbt) {
        jsnbt.controllers.SettingsControllerBase.apply(this, $scope.getBaseArguments($scope));

        $scope.init();
    };
    SettingsController.prototype = Object.create(jsnbt.controllers.SettingsControllerBase.prototype);

    angular.module("jsnbt-courses")
        .controller('CoursesTutorsSettingsController', ['$scope', '$location', '$jsnbt', SettingsController]);

})();