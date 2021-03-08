const cons = require('consolidate');
var keystone = require('keystone');
var jwt = require('jsonwebtoken');
var Company = keystone.list('Company');
var localStorage = require('../../utils/localStorage');
const countryCodes = require('country-calling-code')

exports = module.exports = function (req, res) {
    localStorage.removeItem('loggedInCompany');
    const companyDetails = JSON.parse(localStorage.getItem('companyData')) || {};
    if (!companyDetails.name) {
        return res.redirect('/jobs/');
    }

    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.data = {
        message: localStorage.getItem('successMessages'),
        companyName: localStorage.getItem('loggedInCompany'),
    };

    locals.countries = countryCodes.codes;


    // new form data
    locals.formData = req.body || {};
    locals.validationErrors = {};


    // item in the header navigation.
    locals.section = 'jobs';
   
    //on post form
    view.on('post', { action: '' }, function (next) {
        if (locals.formData.password !== locals.formData.cpassword) {
            locals.formerror = true;
            req.flash("error", "Passwords Do Not Match.");
            locals.validationErrors = "Passwords Do Not Match.";
            return next({ message: 'Passwords Do Not Match' });
        }

        var newCompany = new Company.model();
        var data = req.body;
        data.companyName = companyDetails.name;
        data.companyUrl = companyDetails.website;
        data.location = companyDetails.location;
        data.industry = companyDetails.industry;
        data.address = companyDetails.address;
        data.categories = companyDetails.categories;

        newCompany.getUpdateHandler(req).process(data, {
            flashErrors: true,
            errorMessage: 'An error occured. Try again',
        }, function (err) {
            if (err) {
                locals.formerror = true;
                if (err.detail.code === 11000) {
                    locals.errorMessage = "Email or Phone Number Already Registered";
                } else {
                    locals.validationErrors = err.detail;
                }
            }
            else {
                const token = jwt.sign({}, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRY });
                localStorage.removeItem('companyData');
                localStorage.setItem('loggedInCompany', newCompany.slug);
                localStorage.setItem('token', token);
                return res.redirect('/jobs/' + newCompany.slug);
            }
            next();
        });
    });

    // Render the view
    view.render('jobsregister_contact');
};
