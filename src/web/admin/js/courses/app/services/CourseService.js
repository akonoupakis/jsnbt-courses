/* global angular:false */

(function () {
    "use strict";

    angular.module("jsnbt-courses")
        .factory('CoursesCourseService', ['$q', '$jsnbt', '$data', 'ModalService', function ($q, $jsnbt, $data, ModalService) {
            var CourseService = {};
            
            CourseService.delete = function (node) {

                var deferred = $q.defer();

                $data.nodes.get({
                    hierarchy: node.id,
                    id: {
                        $ne: [node.id]
                    },
                    $limit: 1
                }).then(function (nodes) {

                    if (nodes.length > 0) {

                        ModalService.open({
                            title: 'oops',
                            message: 'this course is not empty and cannot be deleted',
                            controller: 'ErrorPromptController',
                            template: 'tmpl/core/modals/errorPrompt.html',
                            btn: {
                                ok: 'ok',
                                cancel: false
                            }
                        }).then(function (result) {
                            deferred.resolve(false);
                        });

                    }
                    else {

                        ModalService.open({
                            title: 'are you sure you want to permanently delete the course ' + node.title[$scope.defaults.language] + '?',
                            controller: 'DeletePromptController',
                            template: 'tmpl/core/modals/deletePrompt.html'
                        }).then(function (result) {
                            if (result) {
                                $data.nodes.del(node.id).then(function (nodeDeleteResults) {
                                    deferred.resolve(true);
                                }, function (nodeDeleteError) {
                                    deferred.reject(nodeDeleteError);
                                });
                            }
                        });
                    }

                }).catch(function (ex) {
                    deferred.reject(ex);
                });

                return deferred.promise;

            };

            return CourseService;
        }]);
})();