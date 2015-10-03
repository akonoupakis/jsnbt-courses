;(function () {
    "use strict";
    
    var CoursesIndexController = function ($scope, $rootScope, $jsnbt, $location) {
        jsnbt.controllers.ControllerBase.apply(this, $rootScope.getBaseArguments($scope));

        $scope.items = [{
            id: 'sets',
            title: 'courses',
            url: '/modules/courses/sets',
            body: 'courses, levels, degrees and their exam results',
            image: 'img/courses/courses.png'
        }, {
            id: 'tutors',
            title: 'tutors',
            url: '/modules/courses/tutors',
            body: 'tutors assigned to courses with minimum profile',
            image: 'img/courses/tutors.png'
        }];
    };
    CoursesIndexController.prototype = Object.create(jsnbt.controllers.ControllerBase.prototype);


    angular.module("jsnbt-courses")
        .controller('CoursesIndexController', ['$scope', '$rootScope', '$jsnbt', '$location', CoursesIndexController]);
})();