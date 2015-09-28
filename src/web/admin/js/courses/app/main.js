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

            var TEMPLATE_BASE = jsnbt.TEMPLATE_BASE;

            var router = new jsnbt.router('courses', $routeProvider);
            
            var routes = {
                index: function (x) {
                    x.section('courses');
                    x.baseTemplate(TEMPLATE_BASE.base);
                    x.template('tmpl/courses/index.html');
                    x.controller('CoursesIndexController');
                },
                sets: function (x) {
                    x.section('courses');
                    x.baseTemplate(TEMPLATE_BASE.list);
                    x.template('tmpl/courses/sets.html');
                    x.scope({
                        prefix: '/modules/courses'
                    });
                    x.controller('CoursesSetsController');
                },
                courses: function (x) {
                    x.section('courses');
                    x.baseTemplate(TEMPLATE_BASE.list);
                    x.template('tmpl/courses/courses.html');
                    x.scope({
                        prefix: '/modules/courses'
                    });
                    x.controller('CoursesCoursesController');
                },
                levels: function (x) {
                    x.section('courses');
                    x.baseTemplate(TEMPLATE_BASE.list);
                    x.template('tmpl/courses/levels.html');
                    x.scope({
                        prefix: '/modules/courses'
                    });
                    x.controller('CoursesLevelsController');
                },
                tutors: function (x) {
                    x.section('courses');
                    x.baseTemplate(TEMPLATE_BASE.list);
                    x.template('tmpl/courses/tutors.html');
                    x.scope({
                        prefix: '/modules/courses',
                        listId: 'tutors'
                    });
                    x.controller('CoursesTutorsController');
                },
                set: function (x) {
                    x.section('courses');
                    x.baseTemplate(TEMPLATE_BASE.nodeForm);
                    x.template('tmpl/courses/form/set.html');
                    x.scope({
                        entity: 'courseSet',
                        prefix: '/modules/courses'
                    });
                    x.controller('CoursesSetController');
                },
                course: function (x) {
                    x.section('courses');
                    x.baseTemplate(TEMPLATE_BASE.nodeForm);
                    x.template('tmpl/courses/form/course.html');
                    x.scope({
                        entity: 'course',
                        prefix: '/modules/courses'
                    });
                    x.controller('CoursesCourseController');
                },
                level: function (x) {
                    x.section('courses');
                    x.baseTemplate(TEMPLATE_BASE.nodeForm);
                    x.template('tmpl/courses/form/level.html');
                    x.scope({
                        entity: 'courseLevel',
                        prefix: '/modules/courses'
                    });
                    x.controller('CoursesLevelController');
                },
                tutor: function (x) {
                    x.section('courses');
                    x.baseTemplate(TEMPLATE_BASE.dataForm);
                    x.template('tmpl/courses/form/tutor.html');
                    x.scope({
                        listId: 'tutors',
                        prefix: '/modules/courses'
                    });
                    x.controller('CoursesTutorController');
                },
                settings: {
                    courses: function (x) {
                        x.section('courses');
                        x.baseTemplate(TEMPLATE_BASE.settings);
                        x.template('tmpl/courses/coursesSettings.html');
                        x.controller('CoursesCoursesSettingsController');
                    },
                    tutors: function (x) {
                        x.section('courses');
                        x.baseTemplate(TEMPLATE_BASE.settings);
                        x.template('tmpl/courses/tutorsSettings.html');
                        x.controller('CoursesTutorsSettingsController');
                    }
                }
            };

            
            router.when('/modules/courses', routes.index);

            router.when('/modules/courses/sets/settings', routes.settings.courses);
            
            router.when('/modules/courses/sets', routes.sets);
            router.when('/content/courses', function (x) {
                routes.sets(x);
                x.scope({
                    prefix: '/content/courses'
                });
            });
               
            router.when('/modules/courses/courses/:id', routes.courses);
            router.when('/content/courses/courses/:id', function (x) {
                routes.courses(x);
                x.scope({
                    prefix: '/content/courses'
                });
            });
            router.when('/content/nodes/courses/courses/:id', function (x) {
                routes.courses(x);
                x.scope({
                    prefix: '/content/nodes/courses'
                });
            });
            
            router.when('/modules/courses/levels/:id', routes.levels);
            router.when('/content/courses/levels/:id', function (x) {
                routes.levels(x);
                x.scope({
                    prefix: '/content/courses'
                });
            });
            router.when('/content/nodes/courses/levels/:id', function (x) {
                routes.levels(x);
                x.scope({
                    prefix: '/content/nodes/courses'
                });
            });

            router.when('/modules/courses/tutors/settings', routes.settings.tutors);

            router.when('/modules/courses/tutors', routes.tutors);
            
            
            router.when('/modules/courses/set/:id', routes.set);
            router.when('/content/courses/set/:id', function (x) {
                routes.set(x);
                x.scope({
                    prefix: '/content/courses'
                });
            });
            router.when('/content/nodes/courses/set/:id', function (x) {
                routes.set(x);
                x.scope({
                    prefix: '/content/nodes/courses'
                });
            });

            router.when('/modules/courses/course/:id', routes.course);
            router.when('/content/courses/course/:id', function (x) {
                routes.course(x);
                x.scope({
                    prefix: '/content/courses'
                });
            });
            router.when('/content/nodes/courses/course/:id', function (x) {
                routes.course(x);
                x.scope({
                    prefix: '/content/nodes/courses'
                });
            });

            router.when('/modules/courses/level/:id', routes.level);
            router.when('/content/courses/level/:id', function (x) {
                routes.level(x);
                x.scope({
                    prefix: '/content/courses'
                });
            });
            router.when('/content/nodes/courses/level/:id', function (x) {
                routes.level(x);
                x.scope({
                    prefix: '/content/nodes/courses'
                });
            });

            router.when('/modules/courses/tutors/:id', routes.tutor);
        }]);
})();