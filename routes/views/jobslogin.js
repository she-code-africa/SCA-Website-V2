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
            .where('email', req.body.email).where('phoneNumber', req.body.password);

        // q.exec(req, res, onSuccess, onFail);
        q.exec(function (err, result) {
            if (err) return res.err(err);
            if (!result) {
                req.flash('error', 'Credentials are incorrect.');
                
            }

            locals.company = result;
            localStorage.setItem('loggedInCompany', result.slug);
            return res.redirect('/jobs/' + result.slug);
        });
        // next();
    });

    // Render the view
    view.render('jobslogin');
};
