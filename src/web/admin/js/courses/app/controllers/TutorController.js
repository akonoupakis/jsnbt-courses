;(function () {
    "use strict";
    
    var CoursesTutorController = function ($scope, $route, $rootScope, $routeParams, $location, $data, $q, $jsnbt, ModalService, PagedDataService) {
        jsnbt.controllers.DataFormControllerBase.apply(this, $scope.getBaseArguments($scope));
        
        $scope.imageSize = {
            height: undefined,
            width: undefined
        };

        $scope.imageTip = undefined;

        $scope.enqueue('preloading', function () {
            var deferred = $q.defer();

            $data.settings.get({
                domain: 'courses'
            }).then(function (response) {
                var settings = _.first(response);

                if (settings) {
                    $scope.imageSize.height = typeof (settings.data.tutorImageHeight) === 'number' ? settings.data.tutorImageHeight : undefined;
                    $scope.imageSize.width = typeof (settings.data.tutorImageWidth) === 'number' ? settings.data.tutorImageWidth : undefined;

                    if ($scope.imageSize.height && $scope.imageSize.width)
                        $scope.imageTip = $scope.imageSize.height + 'x' + $scope.imageSize.width;
                }
                
                deferred.resolve();
            }, function (error) {
                deferred.reject();
            });

            return deferred.promise;
        });

        $scope.init();
    };
    CoursesTutorController.prototype = Object.create(jsnbt.controllers.DataFormControllerBase.prototype);

    angular.module("jsnbt-courses")
        .controller('CoursesTutorController', ['$scope', '$route', '$rootScope', '$routeParams', '$location', '$data', '$q', '$jsnbt', 'ModalService', 'PagedDataService', CoursesTutorController]);
})();