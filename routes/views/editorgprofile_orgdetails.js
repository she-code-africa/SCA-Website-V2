var keystone = require('keystone');
var localStorage = require('../../utils/localStorage');
const generateRandomString = require('../../utils/generateRandomString');


exports = module.exports = function (req, res) {
    const { cookieTag } = req.decoded || {};

    const companyData = localStorage.getItem(`loggedInCompany-${cookieTag}`) 
        ? localStorage.getItem(`loggedInCompany-${cookieTag}`) 
        : "";
    if (companyData === "") {
        return res.redirect('/jobs');
    }

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // item in the header navigation.
    locals.section = 'jobs';
    locals.data = {
        company: {},
        companyName: localStorage.getItem(`loggedInCompany-${cookieTag}`) || "",
    };
    locals.formData = req.body || {};

    //company details
    view.on('init', function (next) {
        var q = keystone.list('Company').model.findOne({ slug: req.params.org });

        q.exec(function (err, result) {
            if (result != null) {
                locals.data.company = result;
            } else {
                return res.status(404);
            }
            next(err);
        });

    });

    // edited company details
    view.on('post', { action: '' }, function () {
        const dataToSave = {
            name: locals.formData.org_name,
            website: locals.formData.website_url,
            address: locals.formData.org_address,
            location: locals.formData.location,
        };
        const dataToSaveString = JSON.stringify(dataToSave);

        // save to session
        const pageId = generateRandomString();
        let hash = Buffer.from(pageId).toString('base64');

        localStorage.setItem(`companyData-${hash}`, dataToSaveString);
        return res.redirect(`/edit/${req.params.org}/contact-details?hash=${hash}`);
    });

    // Render the view
    view.render('editorgprofile_orgdetails');
};
