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
var cookieParser = require('cookie-parser');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Handle 404 errors
keystone.set('404', function(req, res, next) {
    // middleware.theme(req, res, next);
    res.status(404).render('errors/404');
});

// Import Route Controllers
var routes = {
    views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function(app) {
    app.use(cookieParser(process.env.TOKEN_SECRET));
    
    // Views
    app.get('/', routes.views.index);
    app.post('/', routes.views.index);
    app.get('/about', routes.views.about);
    app.get('/events', routes.views.events);
    app.get('/events/:event', routes.views.event);
    app.get('/team', routes.views.team);
    app.get('/code-of-conduct', routes.views.conduct);
    app.get('/donate-partner', routes.views.donatepartner);
    app.get('/partner', routes.views.donatepartner);
    app.get('/donate', routes.views.donatepartner);
    app.post('/chapters', routes.views.chapters);
    app.get('/chapters', routes.views.chapters);
    app.get('/faq', routes.views.faq);
    app.get('/privacy', routes.views.privacy);
    app.get('/terms', routes.views.terms);
    app.get('/jobs', routes.views.jobs);
    app.get('/jobs/:org', middleware.getCookieAndFiles, middleware.verifyToken, routes.views.jobsorgdashboard);
    app.get('/view/jobs/:id', routes.views.jobdetail);
    app.get('/edit/jobs/:org', middleware.getCookieAndFiles, middleware.verifyToken, routes.views.editorgprofile_orgdetails);
    app.post('/edit/jobs/:org', middleware.getCookieAndFiles, middleware.verifyToken, routes.views.editorgprofile_orgdetails);
    app.get('/edit/:org/contact-details', middleware.getCookieAndFiles, middleware.verifyToken, routes.views.editorgprofile_contactdetails);
    app.post('/edit/:org/contact-details', middleware.getCookieAndFiles, middleware.verifyToken, routes.views.editorgprofile_contactdetails);
    app.get('/jobs/register/org-details', routes.views.jobsregister);
    app.post('/jobs/register/org-details', routes.views.jobsregister);
    app.get('/jobs/register/contact-details', routes.views.jobsregister_contact);
    app.post('/jobs/register/contact-details', routes.views.jobsregister_contact);
    app.get('/jobs/post/new', middleware.getCookieAndFiles, middleware.verifyToken, routes.views.jobdetails);
    app.post('/jobs/post/new', middleware.getCookieAndFiles, middleware.verifyToken, routes.views.jobdetails);
    app.get('/jobs/org/login', routes.views.jobslogin);
    app.post('/jobs/org/login', routes.views.jobslogin);
    app.get('/success', routes.views.successMessage);
    app.get('/logout', middleware.logoutUser);

    // app.get('/blog/:category?', routes.views.blog);
    // app.get('/blog/post/:post', routes.views.post);
    // app.get('/community', routes.views.community);
    // app.get('/gallery', routes.views.gallery);
    // app.all('/contact', routes.views.contact);

    // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
    // app.get('/protected', middleware.requireUser, routes.views.protected);

};
