var keystone = require('keystone');
// var Company = keystone.list('Company');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // item in the header navigation.
    locals.section = 'jobs';
    locals.form = req.body;
    // locals.validationErrors = {};

    // on adding company
    view.on('post', { action: '' }, function () {
        const dataToSave = {
            name: locals.form.org_name,
            industry: locals.form.org_industry,
            website: locals.form.website_url,
            address: locals.form.org_address,
            location: locals.form.location,
        };
        console.log("the data is", dataToSave);
        // save to session
        // localStorage.setItem('companyData', dataToSave);
        // next();
        return res.redirect(`/jobs/register/contact-details?data=${dataToSave}`);

    });

    // Render the view
    view.render('jobsregister');
};
