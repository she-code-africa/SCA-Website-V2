var keystone = require('keystone');
// var Company = keystone.list('Company');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// item in the header navigation.
	locals.section = 'jobs';
	locals.formData = req.body || {};
	// locals.validationErrors = {};

	// on adding company
	view.on('post', { action: '' }, function () {
		const dataToSave = {
			name: locals.formData.org_name,
			industry: locals.formData.org_industry,
			website: locals.formData.website_url,
			address: locals.formData.org_address,
			location: locals.formData.location,
		};
		// save to session
		localStorage.setItem('companyData', dataToSave);
		localStorage.getItem('companyData');

		// next();
		// return res.redirect(`/jobs/register/contact-details?data=${dataToSave}`);

	});

	// Render the view
	view.render('jobsregister');
};
