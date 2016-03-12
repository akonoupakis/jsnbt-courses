var _ = require('underscore');

module.exports = {
    
    domain: 'courses',

    pointed: true,

    init: function (application) {

    },
    
    getName: function () {
        return require('../../package.json').name;
    },
    
    getVersion: function () {
        return require('../../package.json').version;
    },

    getConfig: function () {
        return require('../cfg/config.js');
    },

    routerPointer: function (server, ctx, next) {
        next();
    },

    url: {

        build: function (server, options, next) {
            for (var item in options.url) {
                if (options.node.entity === 'courseLevel') {
                    options.url[item] += '#' + options.node.id;
                }
                else {
                    options.url[item] += '/' + options.node.seo[item];
                }
            }
            next(options.url);
        },
        
        resolve: function (server, options, next) {

            if (options.page) {
                if (options.page.entity === 'courseLevel')
                    next();
                else
                    next(options);
            }
            else {
                next();
            }
        }

    }

};