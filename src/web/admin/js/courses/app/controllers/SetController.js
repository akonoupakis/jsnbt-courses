﻿;(function () {
    "use strict";

    var CoursesSetController = function ($scope, $route, $rootScope, $location, $q, $data, $jsnbt, $logger) {
        jsnbt.NodeFormControllerBase.apply(this, $scope.getBaseArguments($scope));

        var logger = $logger.create('CoursesSetController');

        var getBreadcrumbFn = $scope.getBreadcrumb;
        $scope.getBreadcrumb = function () {
            var deferred = $q.defer();
            
            getBreadcrumbFn().then(function (breadcrumb) {

                $scope.getNodeBreadcrumb($scope.isNew() ? { id: 'new', parent: $scope.parent ? $scope.parent.id : '' } : $scope.node, $scope.prefix).then(function (bc) {

                    breadcrumb.splice($scope.offset);

                    _.each(bc, function (c) {
                        breadcrumb.push(c);
                    });

                    if ($scope.prefix === '/modules/courses') {
                        breadcrumb.splice($scope.offset, 0, {
                            name: 'sets',
                            url: '/modules/courses/sets'
                        });
                    }

                    if (!$scope.isNew()) {
                        breadcrumb.splice(breadcrumb.length - 1, 0, {
                            url: $jsnbt.entities['courseSet'].getViewUrl($scope.node, $scope.prefix),
                            visible: false
                        });
                    }

                    deferred.resolve(breadcrumb);

                }).catch(function (ex) {
                    deferred.reject(ex);
                });

            }).catch(function (ex) {
                deferred.reject(ex);
            });

            return deferred.promise;
        };

        $scope.init().catch(function (ex) {
            logger.error(ex);
        });
    };
    CoursesSetController.prototype = Object.create(jsnbt.NodeFormControllerBase.prototype);

    angular.module("jsnbt-courses")
        .controller('CoursesSetController', ['$scope', '$route', '$rootScope', '$location', '$q', '$data', '$jsnbt', '$logger', CoursesSetController]);

})();