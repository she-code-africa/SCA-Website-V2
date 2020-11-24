const cons = require('consolidate');
var keystone = require('keystone');
var Company = keystone.list('Company');
var localStorage = require('../../utils/localStorage');

exports = module.exports = function (req, res) {
    localStorage.removeItem('loggedInCompany');

    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.formData = req.body || {};

    // item in the header navigation.
    locals.section = 'jobs';
    locals.company = [];

    view.on('post', { action: '' }, function (next) {
        var q = Company.model.findOne()
            .where('email', req.body.email);
        q.exec(function (err, result) {
            if (result) {
                result._.password.compare(req.body.password, function (err, isMatch) {
                    if (!err && isMatch) {
                        locals.company = result;
                        localStorage.setItem('loggedInCompany', result.slug);
                        return res.redirect('/jobs/' + result.slug);
                    } else {
                        req.flash('error', 'Incorrect email or password');
                        return next({ message: 'Incorrect email or password' });
                    }
                });
            } else {
                req.flash('error', 'Incorrect email or password');
                return next({ message: 'Incorrect email or password' });
            }
        });
    });

    // Render the view
    view.render('jobslogin');
};
