const cons = require('consolidate');
var keystone = require('keystone');
var jwt = require('jsonwebtoken');
var Company = keystone.list('Company');
var localStorage = require('../../utils/localStorage');

exports = module.exports = function(req, res) {
    localStorage.removeItem('loggedInCompany');

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
        const sessionExpiredMsg = localStorage.getItem('sessionExpired') ? localStorage.getItem('sessionExpired') : '';

        if (sessionExpiredMsg) {
            localStorage.removeItem('sessionExpired');
            locals.sessionExpired = `${sessionExpiredMsg}`;
        }
        next();
    });

    view.on('post', { action: '' }, function(next) {
        var q = Company.model.findOne()
            .where('email', req.body.email);
        q.exec(function(err, result) {
            if (result) {
                result._.password.compare(req.body.password, function(err, isMatch) {
                    if (!err && isMatch) {
                        const token = jwt.sign({}, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRY });
                        
                        locals.formerror = false;
                        locals.company = result;
                        localStorage.setItem('loggedInCompany', result.slug);
                        localStorage.setItem('token', token);
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