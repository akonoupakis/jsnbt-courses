;(function () {
    "use strict";

    var CoursesSetController = function ($scope, $rootScope, $route, $location, $q, $data, $jsnbt, $logger) {
        jsnbt.controllers.NodeFormControllerBase.apply(this, $rootScope.getBaseArguments($scope));

        var logger = $logger.create('CoursesSetController');

        this.init().catch(function (ex) {
            logger.error(ex);
        });
    };
    CoursesSetController.prototype = Object.create(jsnbt.controllers.NodeFormControllerBase.prototype);

    CoursesSetController.prototype.getBreadcrumb = function () {
        var deferred = this.ctor.$q.defer();

        var self = this;

        jsnbt.controllers.NodeFormControllerBase.prototype.getBreadcrumb.apply(this, arguments).then(function (breadcrumb) {

            if (self.scope.model) {
                self.scope.getNodeBreadcrumb(self.isNew() ? { id: 'new', parent: self.scope.parent ? self.scope.parent.id : '' } : self.scope.model, self.scope.prefix).then(function (bc) {

                    var offset = self.scope.offset;
                    var remaining = 1;
                    if (self.scope.prefix === '/content/nodes/courses' && self.scope.offset === 3) {
                        offset--;
                        remaining++;
                    }

                    breadcrumb.splice(offset);

                    _.each(bc, function (c) {
                        breadcrumb.push(c);
                    });

                    if (self.scope.prefix === '/modules/courses') {
                        breadcrumb.splice(self.scope.offset, 0, {
                            name: 'sets',
                            url: '/modules/courses/sets'
                        });
                    }

                    if (self.scope.prefix !== '/content/nodes/courses') {
                        if (!self.isNew()) {
                            breadcrumb.splice(breadcrumb.length - 1, 0, {
                                url: self.ctor.$jsnbt.entities['courseSet'].getViewUrl(self.scope.model, self.scope.prefix),
                                visible: false
                            });
                        }
                    }

                    deferred.resolve(breadcrumb);

                }).catch(function (ex) {
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
        .controller('CoursesSetController', ['$scope', '$rootScope', '$route', '$location', '$q', '$data', '$jsnbt', '$logger', CoursesSetController]);

})();