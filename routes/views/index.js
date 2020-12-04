var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');


exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // item in the header navigation.
    locals.section = 'home';
    locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
    locals.formData = req.body || {};
    locals.validationErrors = {};
    locals.enquirySubmitted = false;

    view.on('post', { action: '' }, function(next) {

        var newEnquiry = new Enquiry.model();
        var updater = newEnquiry.getUpdateHandler(req);

        updater.process(req.body, {
            flashErrors: true,
            fields: 'name, email, message',
            errorMessage: 'There was a problem submitting your feedback',
        }, function(err) {
            if (err) {
                locals.validationErrors = err.errors;
            } else {
                locals.enquirySubmitted = true;
                setTimeout(() => {
                    locals.enquirySubmitted = false;
                }, 3000)

            }

            next();
        });
    });
    // Render the view
    view.render('index');
};