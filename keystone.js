// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var cons = require('consolidate');
var nunjucks = require('nunjucks');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
    'name': 'She Code Africa',
    'brand': 'She Code Africa',

    'sass': 'public',
    'static': 'public',
    'favicon': 'public/images/favicon.ico',
    'views': 'templates/views',
    'view engine': '.html',
    'custom engine': cons.nunjucks, 
    'emails': 'templates/emails',

    'auto update': true,
    'session': true,
    'auth': true,
    'user model': 'User',
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
    _: require('lodash'),
    env: keystone.get('env'),
    utils: keystone.utils,
    editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
    posts: ['posts', 'post-categories'],
    // galleries: 'galleries',
    enquiries: 'enquiries',
    // partnerships: 'partnerships',
    users: 'users',
    jobs: ['jobs', 'job-categories'],
    teams: ['teams', 'team-categories'],
    chapters: ['chapters', 'chapter-categories'],
    events: 'events',
    programs: 'programs',
});

// optional, will force cloudinary to serve images over https
keystone.set('cloudinary secure', true);

// Start Keystone to connect to your database and initialise the web server
if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    console.log('----------------------------------------' +
        '\nWARNING: MISSING MAILGUN CREDENTIALS' +
        '\n----------------------------------------' +
        '\nYou have opted into email sending but have not provided' +
        '\nmailgun credentials. Attempts to send will fail.' +
        '\n\nCreate a mailgun account and add the credentials to the .env file to' +
        '\nset up your mailgun integration');
}


keystone.start();
