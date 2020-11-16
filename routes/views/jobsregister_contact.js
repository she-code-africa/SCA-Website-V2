var keystone = require('keystone');
var Company = keystone.list('Company');
var localStorage = require('../../utils/localStorage');

exports = module.exports = function (req, res) {
	// Retrieve Company data stored in session
	const companyDetails = JSON.parse(localStorage.getItem('companyData')) || {};
	console.log(companyDetails);

    var view = new keystone.View(req, res);
    var locals = res.locals;
    //get data from storage or query string
    //locals.companyData = req.session // req.url
    // new form data
    locals.formData = req.body || {};

    // item in the header navigation.
    locals.section = 'jobs';

    //on post form
    view.on('post', { action: '' }, function (next) {
        var newCompany = new Company.model();
        var data = req.body;
        // add from session or requery
        // data.company_name = something from the session!?!?

        newCompany.getUpdateHandler(req).process(data, {
            flashErrors: true,
        }, function (err) {
            if (err) {
                locals.validationErrors = err.errors;
            }
            else {
                req.flash('success', 'Registered');
                return res.redirect('/jobs/' + newCompany.slug);
            }
            next();
        });
    });

    // Render the view
    view.render('jobsregister_contact');
};
