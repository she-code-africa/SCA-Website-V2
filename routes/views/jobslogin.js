const cons = require('consolidate');
var keystone = require('keystone');
var jwt = require('jsonwebtoken');
var Company = keystone.list('Company');
var localStorage = require('../../utils/localStorage');
const generateRandomString = require('../../utils/generateRandomString');

exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.formData = req.body || {};

    // item in the header navigation.
    locals.section = 'jobs';
    locals.company = [];
    locals.formerror = false;
    locals.sessionExpired = undefined;

    //check if user got to this page after session expired
    view.on('init', function (next) {
        const clientCookieTag = req.signedCookies.tag;
        const sessionExpiredMsg = localStorage.getItem(`sessionExpired-${clientCookieTag}`)
            ? localStorage.getItem(`sessionExpired-${clientCookieTag}`) 
            : '';

        if (sessionExpiredMsg) {
            localStorage.removeItem(`sessionExpired-${clientCookieTag}`);
            locals.sessionExpired = `${sessionExpiredMsg}`;
            res.clearCookie('tag');
        }
        next();
    });

    //check if user still has active session
    /*
        - check for cookie tag
        - if cookie tag exists
            - check if any token has the tag appended to it
            - if there is a token
                - get loggedInCompany with the tag appended
                - redirect user to that company page
            - if there is no token
                - render log in page
    */
    view.on('init', function(next) {
        const clientCookieTag = req.signedCookies.tag;
        if (!clientCookieTag) {
            next();
        } else {
            let correspondingToken = localStorage.getItem(`token-${clientCookieTag}`);
            let correspondingSlug = localStorage.getItem(`loggedInCompany-${clientCookieTag}`);
            let serverCookieTag = localStorage.getItem(`${correspondingSlug}`.normalize());

            if (clientCookieTag === serverCookieTag && correspondingToken) {
                jwt.verify(correspondingToken, process.env.TOKEN_SECRET, (err, decoded) => {
                    if (err) {
                        localStorage.removeItem(`${correspondingSlug}`)
                        localStorage.removeItem(`loggedInCompany-${serverCookieTag}`);
                        localStorage.removeItem(`token-${serverCookieTag}`);
                        res.clearCookie('tag');
        
                        next();
                    } else {
                        return res.redirect('/jobs/' + correspondingSlug);
                    }
                });
            } 
            else {
                next();
            }     
        }
    });


    view.on('post', { action: '' }, function(next) {
        var q = Company.model.findOne()
            .where('email', req.body.email);
        q.exec(function(err, result) {
            if (result) {
                result._.password.compare(req.body.password, function(err, isMatch) {
                    if (!err && isMatch) {
                        const token = jwt.sign({}, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRY });
                        const tag = generateRandomString();
                        
                        locals.formerror = false;
                        locals.company = result;
                        localStorage.setItem(`loggedInCompany-${tag}`, result.slug);
                        localStorage.setItem(`token-${tag}`, token);
                        localStorage.setItem(`${result.slug}`, tag);
                        res.cookie('tag', tag, {signed: true});

                        return res.redirect('/jobs/' + result.slug);
                    } else {
                        locals.formerror = true;
                        req.flash('error', 'Incorrect email or password');
                        return next({ message: 'Incorrect email or password' });
                    }
                });
            } else {
                locals.formerror = true;
                req.flash('error', 'Incorrect email or password');
                return next({ message: 'Incorrect email or password' });
            }
        });
    });

    // Render the view
    view.render('jobslogin');
};
