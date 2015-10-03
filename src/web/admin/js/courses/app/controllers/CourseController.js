;(function () {
    "use strict";

    var CoursesCourseController = function ($scope, $route, $rootScope, $location, $q, $data, $jsnbt, $logger) {
        jsnbt.controllers.NodeFormControllerBase.apply(this, $scope.getBaseArguments($scope));

        var logger = $logger.create('CoursesCourseController');

        $scope.offset = _.str.trim($scope.prefix || '', '/').split('/').length;

        $scope.imageSize = {
            teaser: {
                height: undefined,
                width: undefined
            },
            body: {
                height: undefined,
                width: undefined
            }
        };

        $scope.imageTip = {
            teaser: undefined,
            body: undefined
        };

        $scope.enqueue('preloading', function () {
            var deferred = $q.defer();

            $data.settings.get({
                domain: 'courses'
            }).then(function (response) {
                var settings = _.first(response);

                if (settings) {
                    $scope.imageSize.teaser.height = typeof (settings.data.courseImageTeaserHeight) === 'number' ? settings.data.courseImageTeaserHeight : undefined;
                    $scope.imageSize.teaser.width = typeof (settings.data.courseImageTeaserWidth) === 'number' ? settings.data.courseImageTeaserWidth : undefined;

                    $scope.imageSize.body.height = typeof (settings.data.courseImageBodyHeight) === 'number' ? settings.data.courseImageBodyHeight : undefined;
                    $scope.imageSize.body.width = typeof (settings.data.courseImageBodyWidth) === 'number' ? settings.data.courseImageBodyWidth : undefined;

                    if ($scope.imageSize.teaser.height && $scope.imageSize.teaser.width)
                        $scope.imageTip.teaser = $scope.imageSize.teaser.height + 'x' + $scope.imageSize.teaser.width;

                    if ($scope.imageSize.body.height && $scope.imageSize.body.width)
                        $scope.imageTip.body = $scope.imageSize.body.height + 'x' + $scope.imageSize.body.width;
                }

                deferred.resolve();
            }, function (error) {
                deferred.reject();
            });

            return deferred.promise;
        });
        
        $scope.enqueue('set', function (node) {
            var deferred = $q.defer();

            $data.nodes.get($scope.isNew() ? $scope.id.substring(4) : node.parent).then(function (response) {
                $scope.parent = response;
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        });

        var getBreadcrumbFn = $scope.getBreadcrumb;
        $scope.getBreadcrumb = function () {
            var deferred = $q.defer();

            getBreadcrumbFn.apply(this, arguments).then(function (response) {
                $scope.getNodeBreadcrumb($scope.isNew() ? { id: 'new', parent: $scope.id.substring(4) } : $scope.node, $scope.prefix).then(function (bc) {

                    var offset = $scope.offset;
                    var remaining = 1;
                    if ($scope.prefix === '/content/nodes/courses' && $scope.offset === 3) {
                        offset--;
                        remaining++;
                    }

                    response.splice(offset);

                    if ($scope.prefix === '/modules/courses') {
                        response.push({
                            name: 'sets',
                            url: '/modules/courses/sets'
                        });
                    }

                    _.each(bc, function (c) {
                        response.push(c);
                    });

                    if (!$scope.isNew()) {
                        response.splice(response.length - 1, 0, {
                            url: $jsnbt.entities['course'].getViewUrl($scope.node, $scope.prefix),
                            visible: false
                        });
                    }

                    deferred.resolve(response);

                }, function (ex) {
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
    CoursesCourseController.prototype = Object.create(jsnbt.controllers.NodeFormControllerBase.prototype);

    angular.module("jsnbt-courses")
        .controller('CoursesCourseController', ['$scope', '$route', '$rootScope', '$location', '$q', '$data', '$jsnbt', '$logger', CoursesCourseController]);

})();