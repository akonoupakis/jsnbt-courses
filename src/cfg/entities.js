module.exports = [{
    name: 'courseSet',
    allowed: ['course'],
    treeNode: true,
    pointed: true,
    properties: {
        parent: false
    }
}, {
    name: 'course',
    allowed: ['courseLevel'],
    treeNode: true,
    properties: {
        parent: false
    }
}, {
    name: 'courseLevel',
    allowed: [],
    treeNode: false,
    properties: {
        parent: false,
        //seo: false,
        layout: false,
        template: false,
        meta: false,
        robots: false,
        permissions: false
    }
}];