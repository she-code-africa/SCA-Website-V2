var keystone = require('keystone');
var localStorage = require('../../utils/localStorage');
// var Company = keystone.list('Company');
var CompanyCategory = keystone.list('CompanyCategory');

exports = module.exports = function(req, res) {
    localStorage.removeItem('loggedInCompany');

    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.data = {
        categories: [],
    };
    // item in the header navigation.
    locals.section = 'jobs';
    locals.formData = req.body || {};
    // locals.validationErrors = {};

    view.on('init', function(next) {
        CompanyCategory.model.find().sort('name').exec(function(err, result) {
            locals.data.categories = result;
            next(err);
        });
    });

    // on adding company
    view.on('post', { action: '' }, function() {
        const dataToSave = {
            name: locals.formData.org_name,
            industry: locals.formData.org_industry,
            website: locals.formData.website_url,
            address: locals.formData.org_address,
            location: locals.formData.location,
        };
        const dataToSaveString = JSON.stringify(dataToSave);

        // save to session
        localStorage.setItem('companyData', dataToSaveString);
        return res.redirect('/jobs/register/contact-details');

    });

    // Render the view
    view.render('jobsregister');
};