;(function () {
    "use strict";

    var CoursesCourseController = function ($scope, $rootScope, $route, $location, $q, $data, $jsnbt, $logger) {
        jsnbt.controllers.NodeFormControllerBase.apply(this, $rootScope.getBaseArguments($scope));

        var self = this;

        var logger = $logger.create('CoursesCourseController');
        
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

        this.enqueue('preloading', '', function () {
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
        
        this.enqueue('set', '', function (node) {
            var deferred = $q.defer();

            $data.nodes.get(self.isNew() ? $scope.id.substring(4) : node.parent).then(function (response) {
                $scope.parent = response;
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        });
        
        this.init().catch(function (ex) {
            logger.error(ex);
        });
    };
    CoursesCourseController.prototype = Object.create(jsnbt.controllers.NodeFormControllerBase.prototype);

    CoursesCourseController.prototype.getBreadcrumb = function () {
        var deferred = this.ctor.$q.defer();

        var self = this;

        jsnbt.controllers.NodeFormControllerBase.prototype.getBreadcrumb.apply(this, arguments).then(function (breadcrumb) {

            if (self.scope.model) {
                self.scope.getNodeBreadcrumb(self.isNew() ? { id: 'new', parent: self.scope.id.substring(4) } : self.scope.model, self.scope.prefix).then(function (bc) {

                    var offset = self.scope.offset;
                    var remaining = 1;
                    if (self.scope.prefix === '/content/nodes/courses' && self.scope.offset === 3) {
                        offset--;
                        remaining++;
                    }

                    breadcrumb.splice(offset);

                    if (self.scope.prefix === '/modules/courses') {
                        breadcrumb.push({
                            name: 'sets',
                            url: '/modules/courses/sets'
                        });
                    }

                    _.each(bc, function (c) {
                        breadcrumb.push(c);
                    });

                    if (!self.isNew()) {
                        breadcrumb.splice(breadcrumb.length - 1, 0, {
                            url: self.ctor.$jsnbt.entities['course'].getViewUrl(self.scope.model, self.scope.prefix),
                            visible: false
                        });
                    }

                    deferred.resolve(breadcrumb);

                }, function (ex) {
                    deferred.reject(ex);
                });
            }
            else {
                deferred.resolve(breadcrumb);
            }

        }).catch(function (ex) {
            deferred.reject(ex);
        });

        return deferred.promise;
    };

    angular.module("jsnbt-courses")
        .controller('CoursesCourseController', ['$scope', '$rootScope', '$route', '$location', '$q', '$data', '$jsnbt', '$logger', CoursesCourseController]);

})();