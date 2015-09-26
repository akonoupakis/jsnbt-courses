;(function () {
    "use strict";

    var CoursesSetController = function ($scope, $route, $rootScope, $location, $q, $data, $jsnbt) {
        jsnbt.NodeFormControllerBase.apply(this, $scope.getBaseArguments($scope));

        $scope.prefix = $route.current.$$route.location ? $route.current.$$route.location.prefix : undefined;
        $scope.offset = _.str.trim($scope.prefix || '', '/').split('/').length;

        console.log()

        var setLocationFn = $scope.setLocation;
        $scope.setLocation = function () {
            var deferred = $q.defer();
            
            setLocationFn.apply(this, arguments).then(function (response) {
                var offset = $scope.offset;
                var remaining = 1;

                if ($scope.prefix === '/content/nodes/courses') {
                    offset--;
                    remaining++;
                }

                if ($scope.prefix === '/modules/courses') {
                    response[response.length - 2].name = 'sets';
                    response[response.length - 2].url = $scope.prefix + '/sets'
                }
                else {
                    response.splice(offset, remaining);
                }

                if ($scope.entity) {
                    
                    var previous = {
                        url: $jsnbt.entities['courseSet'].getViewUrl($scope.node, $scope.prefix),
                        visible: false
                    };

                    response.splice(response.length - 1, 0, previous);
                }

                deferred.resolve(response);
            }).catch(function (ex) {
                deferred.reject(ex);
            });

            return deferred.promise;
        };

        $scope.init();
    };
    CoursesSetController.prototype = Object.create(jsnbt.NodeFormControllerBase.prototype);

    angular.module("jsnbt-courses")
        .controller('CoursesSetController', ['$scope', '$route', '$rootScope', '$location', '$q', '$data', '$jsnbt', CoursesSetController]);

})();