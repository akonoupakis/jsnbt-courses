;(function () {
    "use strict";

    var CoursesLevelController = function ($scope, $route, $rootScope, $location, $q, $data) {
        jsnbt.NodeFormControllerBase.apply(this, $scope.getBaseArguments($scope));

        $scope.prefix = $route.current.$$route.location ? $route.current.$$route.location.prefix : undefined;
        $scope.offset = _.str.trim($scope.prefix || '', '/').split('/').length;

        var setLocationFn = $scope.setLocation;
        $scope.setLocation = function () {
            var deferred = $q.defer();

            setLocationFn.apply(this, arguments).then(function (response) {
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

        $scope.$watch('parent.title', function () {
            if (!$scope.parent)
                return;

            $scope.setLocation();
        });
        
        $scope.enqueue('load', function () {
            var deferred = $q.defer();

            $data.nodes.get($scope.isNew() ? $scope.id.substring(4) : $scope.node.parent).then(function (response) {
                $scope.parent = response;
                deferred.resolve();
            }, function (error) {
                deferred.reject();
            });

            return deferred.promise;
        });

        $scope.init();
    };
    CoursesLevelController.prototype = Object.create(jsnbt.NodeFormControllerBase.prototype);

    angular.module("jsnbt-courses")
        .controller('CoursesLevelController', ['$scope', '$route', '$rootScope', '$location', '$q', '$data', CoursesLevelController]);

})();