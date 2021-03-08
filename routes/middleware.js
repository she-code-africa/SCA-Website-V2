/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var localStorage = require('../utils/localStorage.js');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function(req, res, next) {
    res.locals.navLinks = [
        { label: 'Home', key: 'home', href: '/' },
        { label: 'About', key: 'about', href: '/about' },
        { label: 'Donate/Partner', key: 'partners', href: '/donate-partner' },
        { label: 'Chapters', key: 'chapters', href: '/chapters' },
        { label: 'Events', key: 'events', href: '/events' },
        { label: 'Job Opportunities', key: 'jobs', href: '/jobs' },
        // { label: 'Community', key: 'community', href: '/community' },
        // { label: 'Gallery', key: 'gallery', href: '/gallery' },
        // { label: 'Contact', key: 'contact', href: '/contact' },
        // { label: 'Blog', key: 'blog', href: '/blog' },
    ];
    res.locals.user = req.user;
    next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function(req, res, next) {
    var flashMessages = {
        info: req.flash('info'),
        success: req.flash('success'),
        warning: req.flash('warning'),
        error: req.flash('error'),
    };
    res.locals.messages = _.some(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;
    next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function(req, res, next) {
    if (!req.user) {
        req.flash('error', 'Please sign in to access this page.');
        res.redirect('/keystone/signin');
    } else {
        next();
    }
};

exports.logoutUser = function(req, res, next) {
    localStorage.removeItem('loggedInCompany');
    if (!localStorage.getItem('loggedInCompany')) {
        res.redirect('/jobs');
    } else {
        alert('Log out request failed, please try again');
    }
};

exports.verifyToken = function(req, res, next) {
    const token = localStorage.getItem('token');
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                if (err.message === 'jwt expired') {
                    localStorage.removeItem('token');
                    // req.flash('error', 'Authentication token has expired, please log in again');
                    res.redirect('/jobs/org/login');
                } else {
                    localStorage.removeItem('token');
                    // req.flash('error', 'Invalid authentication token, please log in to view page');
                    res.redirect('/jobs/org/login');
                }
            } else {
                next();
            }
        });
    } else {
        // req.flash('error', 'Please log in to view page');
        res.redirect('/jobs/org/login');
    }
};
