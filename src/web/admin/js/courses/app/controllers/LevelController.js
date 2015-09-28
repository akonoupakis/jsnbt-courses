;(function () {
    "use strict";

    var CoursesLevelController = function ($scope, $route, $rootScope, $location, $q, $data, $logger) {
        jsnbt.NodeFormControllerBase.apply(this, $scope.getBaseArguments($scope));

        var logger = $logger.create('CoursesLevelController');

        $scope.offset = _.str.trim($scope.prefix || '', '/').split('/').length;

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
    CoursesLevelController.prototype = Object.create(jsnbt.NodeFormControllerBase.prototype);

    angular.module("jsnbt-courses")
        .controller('CoursesLevelController', ['$scope', '$route', '$rootScope', '$location', '$q', '$data', '$logger', CoursesLevelController]);

})();