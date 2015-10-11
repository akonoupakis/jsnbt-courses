﻿/* global angular:false */

(function () {
    "use strict";

    angular.module("jsnbt-courses")
        .factory('CoursesLevelService', ['$q', '$jsnbt', '$data', 'ModalService', function ($q, $jsnbt, $data, ModalService) {
            var LevelService = {};
            
            LevelService.delete = function (node) {

                var deferred = $q.defer();

                $data.nodes.get({
                    hierarchy: node.id,
                    id: {
                        $ne: [node.id]
                    },
                    $limit: 1
                }).then(function (nodes) {

                    if (nodes.length > 0) {

                        ModalService.prompt(function (x) {
                            x.title('oops');
                            x.message('this level is not empty and cannot be deleted');
                        }).then(function (result) {
                            deferred.resolve(false);
                        }).catch(function (ex) {
                            deferred.reject(ex);
                        });
                        
                    }
                    else {

                        ModalService.confirm(function (x) {
                            x.title('are you sure you want to permanently delete the level ' + node.title[$scope.defaults.language] + '?');
                        }).then(function (result) {
                            if (result) {
                                $data.nodes.del(node.id).then(function (nodeDeleteResults) {
                                    deferred.resolve(true);
                                }, function (nodeDeleteError) {
                                    deferred.reject(nodeDeleteError);
                                });
                            }
                        }).catch(function (ex) {
                            deferred.reject(ex);
                        });

                    }

                }).catch(function (ex) {
                    deferred.reject(ex);
                });

                return deferred.promise;

            };

            return LevelService;
        }]);
})();