;(function () {
    "use strict";
    
    var CoursesTutorController = function ($scope, $rootScope, $data, $q, $jsnbt, $logger, ModalService, PagedDataService) {
        jsnbt.controllers.DataFormControllerBase.apply(this, $rootScope.getBaseArguments($scope));
        
        var self = this;

        var logger = $logger.create('CoursesTutorController');

        $scope.imageSize = {
            height: undefined,
            width: undefined
        };

        $scope.imageTip = undefined;

        this.enqueue('preloading', '', function () {
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

        this.enqueue('set', '', function () {
            var deferred = $q.defer();

            if ($scope.model &&
                $scope.model.content &&
                $scope.model.content.localized &&
                $scope.model.content.localized[$scope.defaults.language]) {
                self.setTitle($scope.model.content.localized[$scope.defaults.language].firstName + ' ' + $scope.model.content.localized[$scope.defaults.language].lastName);
            }
            
            deferred.resolve();

            return deferred.promise;
        });

        this.enqueue('published', '', function () {
            var deferred = $q.defer();

            if ($scope.model &&
                $scope.model.content &&
                $scope.model.content.localized &&
                $scope.model.content.localized[$scope.defaults.language]) {
                self.setTitle($scope.model.content.localized[$scope.defaults.language].firstName + ' ' + $scope.model.content.localized[$scope.defaults.language].lastName);
            }

            deferred.resolve();

            return deferred.promise;
        });

        this.init().catch(function (ex) {
            logger.error(ex);
        });
    };
    CoursesTutorController.prototype = Object.create(jsnbt.controllers.DataFormControllerBase.prototype);

    angular.module("jsnbt-courses")
        .controller('CoursesTutorController', ['$scope', '$rootScope', '$data', '$q', '$jsnbt', '$logger', 'ModalService', 'PagedDataService', CoursesTutorController]);
})();