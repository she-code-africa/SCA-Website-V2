var keystone = require('keystone');
var localStorage = require('../../utils/localStorage');
// var Company = keystone.list('Company');
var CompanyCategory = keystone.list('CompanyCategory');
const generateRandomString = require('../../utils/generateRandomString');

exports = module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.data = {
        categories: [],
    };
    // item in the header navigation.
    locals.section = 'jobs';
    locals.formData = req.body || {};
    // locals.validationErrors = {}; 

    // view.on('init', function (next) {
    //     CompanyCategory.model.find().sort('name').exec(function (err, result) {
    //         locals.data.categories = result;
    //         next(err);
    //     });
    // });

    // on adding company
    view.on('post', { action: '' }, function () {
        // console.log(locals.formData);
        const dataToSave = {
            name: locals.formData.org_name,
            // industry: locals.formData.org_industry,
            website: locals.formData.website_url,
            address: locals.formData.org_address,
            location: locals.formData.location,
        };
        // if (locals.formData.org_industry === 'other') {
        //     dataToSave.categories = ''
        //     dataToSave.industry = locals.formData.industry
        // } else {
        //     dataToSave.categories = locals.formData.org_industry
        // }
        // console.log(dataToSave);
        const dataToSaveString = JSON.stringify(dataToSave);

        // save to session
        const pageId = generateRandomString();
        let hash = Buffer.from(pageId).toString('base64');

        localStorage.setItem(`companyData-${hash}`, dataToSaveString);
        return res.redirect(`/jobs/register/contact-details?hash=${hash}`);
    });

    // Render the view
    view.render('jobsregister');
};