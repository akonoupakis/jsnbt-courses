; (function () {
    "use strict";
    
    var _prefix = '/modules/courses';
    
    var setEntity = jsnbt.entities['courseSet'];

    setEntity.editable = true;
    setEntity.viewable = true;
    setEntity.deletable = true;

    setEntity.getCreateUrl = function (node, prefix) {
        var prfx = prefix || _prefix;

        if (prfx === '/content/nodes')
            prfx += '/courses';

        return prfx + '/set/new' + (node ? '-' + node.id : '');
    };
    setEntity.getEditUrl = function (node, prefix) {
        var prfx = prefix || _prefix;

        if (prfx === '/content/nodes')
            prfx += '/courses';

        return prfx + '/set/' + node.id;
    };
    setEntity.getViewUrl = function (node, prefix) {
        var prfx = prefix || _prefix;

        if (prfx === '/content/nodes')
            prfx += '/courses';

        return prfx + '/courses/' + node.id;
    };
    

    var courseEntity = jsnbt.entities['course'];

    courseEntity.editable = true;
    courseEntity.viewable = true;
    courseEntity.deletable = true;

    courseEntity.getCreateUrl = function (node, prefix) {
        var prfx = prefix || _prefix;

        if (prfx === '/content/nodes')
            prfx += '/courses';

        return prfx + '/course/new-' + node.id;
    };
    courseEntity.getEditUrl = function (node, prefix) {
        var prfx = prefix || _prefix;

        if (prfx === '/content/nodes')
            prfx += '/courses';

        return prfx + '/course/' + node.id;
    };
    courseEntity.getViewUrl = function (node, prefix) {
        var prfx = prefix || _prefix;

        if (prfx === '/content/nodes')
            prfx += '/courses';

        return prfx + '/levels/' + node.id;
    };


    var levelEntity = jsnbt.entities['courseLevel'];

    levelEntity.editable = true;
    levelEntity.viewable = false;
    levelEntity.deletable = true;

    levelEntity.getCreateUrl = function (node, prefix) {
        var prfx = prefix || _prefix;

        if (prfx === '/content/nodes')
            prfx += '/courses';

        return prfx + '/level/new-' + node.id;
    };
    levelEntity.getEditUrl = function (node, prefix) {
        var prfx = prefix || _prefix;

        if (prfx === '/content/nodes')
            prfx += '/courses';

        return prfx + '/level/' + node.id;
    };
    levelEntity.getViewUrl = function (node, prefix) {
        throw new Error('not implemented');
    };


    angular.module("jsnbt-courses", ['ngRoute'])
    .config(['$routeProvider',
        function ($routeProvider) {

            var router = angular.getRouter($routeProvider);

            var getIndexOptions = function (definition) {

                var obj = {};
                $.extend(true, obj, {
                    domain: 'courses',
                    section: 'courses',
                    controller: 'CoursesIndexController',
                    templateUrl: 'tmpl/courses/index.html',
                    location: {
                        prefix: '/modules/courses'
                    }
                }, definition);

                return obj;
            };

            var getSetsOptions = function (definition) {

                var obj = {};
                $.extend(true, obj, {
                    controller: 'CoursesSetsController',
                    baseTemplateUrl: 'tmpl/core/base/list.html',
                    templateUrl: 'tmpl/courses/sets.html',
                    section: 'courses',
                    domain: 'courses',
                    location: {
                        prefix: '/modules/courses'
                    }
                }, definition);

                return obj;
            };

            var getCoursesOptions = function (definition) {

                var obj = {};
                $.extend(true, obj, {
                    controller: 'CoursesCoursesController',
                    baseTemplateUrl: 'tmpl/core/base/list.html',
                    templateUrl: 'tmpl/courses/courses.html',
                    section: 'courses',
                    domain: 'courses',
                    location: {
                        prefix: '/modules/courses'
                    }
                }, definition);

                return obj;
            };

            var getLevelsOptions = function (definition) {

                var obj = {};
                $.extend(true, obj, {
                    controller: 'CoursesLevelsController',
                    baseTemplateUrl: 'tmpl/core/base/list.html',
                    templateUrl: 'tmpl/courses/levels.html',
                    section: 'courses',
                    domain: 'courses',
                    location: {
                        prefix: '/modules/courses'
                    }
                }, definition);

                return obj;
            };

            var getTutorsOptions = function (definition) {
                
                var obj = {};
                $.extend(true, obj, {
                    controller: 'CoursesTutorsController',
                    baseTemplateUrl: 'tmpl/core/base/list.html',
                    templateUrl: 'tmpl/courses/tutors.html',
                    section: 'courses',
                    domain: 'courses',
                    list: 'tutors',
                    location: {
                        prefix: '/modules/courses'
                    }
                }, definition);

                return obj;
            };


            var getSetOptions = function (definition) {

                var obj = {};
                $.extend(true, obj, {
                    controller: 'CoursesSetController',
                    baseTemplateUrl: 'tmpl/core/base/node.html',
                    templateUrl: 'tmpl/courses/form/set.html',
                    section: 'courses',
                    domain: 'courses',
                    entity: 'courseSet',
                    location: {
                        prefix: '/modules/courses'
                    }
                }, definition);

                return obj;
            };

            var getCourseOptions = function (definition) {

                var obj = {};
                $.extend(true, obj, {
                    controller: 'CoursesCourseController',
                    baseTemplateUrl: 'tmpl/core/base/node.html',
                    templateUrl: 'tmpl/courses/form/course.html',
                    section: 'courses',
                    domain: 'courses',
                    entity: 'course',
                    location: {
                        prefix: '/modules/courses'
                    }
                }, definition);

                return obj;
            };

            var getLevelOptions = function (definition) {

                var obj = {};
                $.extend(true, obj, {
                    controller: 'CoursesLevelController',
                    baseTemplateUrl: 'tmpl/core/base/node.html',
                    templateUrl: 'tmpl/courses/form/level.html',
                    section: 'courses',
                    domain: 'courses',
                    entity: 'courseLevel',
                    location: {
                        prefix: '/modules/courses'
                    }
                }, definition);

                return obj;
            };

            var getTutorOptions = function (definition) {

                var obj = {};
                $.extend(true, obj, {
                    controller: 'CoursesTutorController',
                    baseTemplateUrl: 'tmpl/core/base/dataForm.html',
                    templateUrl: 'tmpl/courses/form/tutor.html',
                    section: 'courses',
                    domain: 'courses',
                    list: 'tutors',
                    location: {
                        prefix: '/modules/courses'
                    }
                }, definition);

                return obj;
            };

            router
                .when('/modules/courses', getIndexOptions())

                .when('/modules/courses/sets/settings', {
                    controller: 'CoursesCoursesSettingsController',
                    baseTemplateUrl: 'tmpl/core/base/settings.html',
                    templateUrl: 'tmpl/courses/coursesSettings.html',
                    section: 'courses',
                    domain: 'courses',
                })
                
                .when('/modules/courses/sets', getSetsOptions())
                .when('/content/courses', getSetsOptions({
                    location: {
                        prefix: '/content/courses'
                    }
                }))

                .when('/modules/courses/courses/:id', getCoursesOptions())
                .when('/content/courses/courses/:id', getCoursesOptions({
                    location: {
                        prefix: '/content/courses'
                    }
                }))
                .when('/content/nodes/courses/courses/:id', getCoursesOptions({
                    location: {
                        prefix: '/content/nodes/courses'
                    }
                }))

                .when('/modules/courses/levels/:id', getLevelsOptions())
                .when('/content/courses/levels/:id', getLevelsOptions({
                    location: {
                        prefix: '/content/courses'
                    }
                }))
                .when('/content/nodes/courses/levels/:id', getLevelsOptions({
                    location: {
                        prefix: '/content/nodes/courses'
                    }
                }))

                .when('/modules/courses/tutors/settings', {
                    controller: 'CoursesTutorsSettingsController',
                    baseTemplateUrl: 'tmpl/core/base/settings.html',
                    templateUrl: 'tmpl/courses/tutorsSettings.html',
                    section: 'courses',
                    domain: 'courses',
                })

                .when('/modules/courses/tutors', getTutorsOptions())


                .when('/modules/courses/set/:id', getSetOptions())
                .when('/content/courses/set/:id', getSetOptions({
                    location: {
                        prefix: '/content/courses'
                    }
                }))
                .when('/content/nodes/courses/set/:id', getSetOptions({
                     location: {
                         prefix: '/content/nodes/courses'
                     }
                }))

                .when('/modules/courses/course/:id', getCourseOptions())
                .when('/content/courses/course/:id', getCourseOptions({
                    location: {
                        prefix: '/content/courses'
                    }
                }))
                .when('/content/nodes/courses/course/:id', getCourseOptions({
                    location: {
                        prefix: '/content/nodes/courses'
                    }
                }))

                .when('/modules/courses/level/:id', getLevelOptions())
                .when('/content/courses/level/:id', getLevelOptions({
                    location: {
                        prefix: '/content/courses'
                    }
                }))
                .when('/content/nodes/courses/level/:id', getLevelOptions({
                    location: {
                        prefix: '/content/nodes/courses'
                    }
                }))

                .when('/modules/courses/tutors/:id', getTutorOptions());
        }]);
})();