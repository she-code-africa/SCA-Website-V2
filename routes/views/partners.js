var keystone = require('keystone');
var Partnership = keystone.list('Partnership');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'partners';
    locals.formData = req.body || {};
    locals.validationErrors = {};
    locals.partnershipSubmitted = false;

    // On POST requests, add the Partnership item to the database
    view.on('post', { action: 'partnership' }, function(next) {

        var newEnquiry = new Partnership.model();
        var updater = newEnquiry.getUpdateHandler(req);

        updater.process(req.body, {
            flashErrors: true,
            fields: 'first_name, last_name, email, company,  details',
            errorMessage: 'There was a problem submitting your partnership form:',
        }, function(err) {
            if (err) {
                locals.validationErrors = err.errors;
            } else {
                locals.partnershipSubmitted = true;
            }
            next();
        });
    });

    view.render('partners');
};