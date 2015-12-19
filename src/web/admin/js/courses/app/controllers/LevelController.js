;(function () {
    "use strict";

    var CoursesLevelController = function ($scope, $rootScope, $route, $location, $q, $data, $logger) {
        jsnbt.controllers.NodeFormControllerBase.apply(this, $rootScope.getBaseArguments($scope));

        var self = this;

        var logger = $logger.create('CoursesLevelController');
        
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
    CoursesLevelController.prototype = Object.create(jsnbt.controllers.NodeFormControllerBase.prototype);

    CoursesLevelController.prototype.getBreadcrumb = function () {
        var deferred = this.ctor.$q.defer();

        var self = this;

        jsnbt.controllers.NodeFormControllerBase.prototype.getBreadcrumb.apply(this, arguments).then(function (breadcrumb) {

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

                deferred.resolve(breadcrumb);

            }, function (ex) {
                deferred.reject(ex);
            });

        }).catch(function (ex) {
            deferred.reject(ex);
        });

        return deferred.promise;
    };

    angular.module("jsnbt-courses")
        .controller('CoursesLevelController', ['$scope', '$rootScope', '$route', '$location', '$q', '$data', '$logger', CoursesLevelController]);

})();