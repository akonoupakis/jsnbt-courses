module.exports = [{
    name: 'courseSet',
    allowed: ['course'],
    treeNode: true,
    pointed: true,
    properties: {
        parent: false,
        courses: true
    }
}, {
    name: 'course',
    allowed: ['courseLevel'],
    treeNode: true,
    ordered: true,
    properties: {
        parent: false,
        levels: true,
        tutors: true
    }
}, {
    name: 'courseLevel',
    allowed: [],
    treeNode: false,
    ordered: true,
    properties: {
        parent: false,
        layouts: false,
        seo: false,
        template: false,
        meta: false,
        robots: false,
        permissions: false,
        tutors: true
    }
}];