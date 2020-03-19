/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
    views: importRoutes('./views'),
    api: importRoutes('./api')
};

// Setup Route Bindings
exports = module.exports = function(app) {
    // Views
    app.all('/', routes.views.index);
    app.get('/blog/:category?', routes.views.blog);
    app.get('/blog/post/:post', routes.views.post);
    app.get('/about', routes.views.about);
    app.get('/chapters', routes.views.chapters);
    app.get('/jobs', routes.views.jobs);
    app.get('/jobs/job/:job', routes.views.job);
    app.get('/community', routes.views.community);
    app.get('/gallery', routes.views.gallery);
    app.all('/contact', routes.views.contact);
    app.all('/partners', routes.views.partners);
    app.get('/team', routes.views.team);
    app.get('/events', routes.views.events);
    app.get('/events/:event', routes.views.event);
    app.get('/code-of-conduct', routes.views.conduct);
    app.get('/frequently-asked-questions', routes.views.faqs);
    //File Upload Route
    // app.get('/api/fileupload/list', keystone.middleware.api, routes.api.fileupload.list);
    // app.get('/api/fileupload/:id', keystone.middleware.api, routes.api.fileupload.get);
    // app.all('/api/fileupload/:id/update', keystone.middleware.api, routes.api.fileupload.update);
    // app.all('/api/fileupload/create', keystone.middleware.api, routes.api.fileupload.create);
    // app.get('/api/fileupload/:id/remove', keystone.middleware.api, routes.api.fileupload.remove);

    // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
    // app.get('/protected', middleware.requireUser, routes.views.protected);

};