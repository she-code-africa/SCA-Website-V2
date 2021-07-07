var keystone = require('keystone')
var Company = keystone.list('Company');
var localStorage = require('../../utils/localStorage');
const countryCodes = require('country-calling-code');
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

exports = module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    let hash = req.query.hash;
    const { cookieTag } = req.decoded || {};
    const slug = req.params.org;
    const companyDetails = JSON.parse(localStorage.getItem(`companyData-${hash}`)) || {};
    if (!hash || !companyDetails.name) {
        return res.redirect('/jobs');
    }

    // item in the header navigation.
    locals.section = 'jobs';
    locals.data = {
        company: {},
        companyName: localStorage.getItem(`loggedInCompany-${cookieTag}`) || "",
    };
    locals.countries = countryCodes.codes;


    // company details
    view.on('init', function (next) {
        var q = keystone.list('Company').model.findOne({ slug });

        q.exec(function (err, result) {
            if (result != null) {
                locals.data.company = result;
            } else {
                return res.status(404);
            }
            next(err);
        });

    })

    //on post form
    view.on('post', { action: '' }, function (next) {
        var data = req.body;
        let numberWithCallingCode;
        const parsedPhoneNumber = phoneUtil.parseAndKeepRawInput(data.phoneNumber, data.countryCode);

        if (phoneUtil.isValidNumberForRegion(parsedPhoneNumber, data.countryCode)) {
            numberWithCallingCode = phoneUtil.format(parsedPhoneNumber, PNF.E164);
        } else {
            locals.formerror = true;
            req.flash("error", "Invalid Phone Number");
            locals.validationErrors.phoneNumber = "Invalid Phone Number";
            return next({ message: 'Invalid Phone Number' });
        }

      // if (locals.formData.password !== locals.formData.cpassword) {
      //     locals.formerror = true;
      //     req.flash("error", "Passwords Do Not Match.");
      //     locals.validationErrors = "Passwords Do Not Match.";
      //     return next({ message: 'Passwords Do Not Match' });
      // }

        var q = Company.model.findOne({ email: data.email });
        q.exec(function (err, result) {
            if (result != null) {
                result.companyName = companyDetails.name;
                result.companyUrl = companyDetails.website;
                result.location = companyDetails.location;
                result.address = companyDetails.address;
                result.phoneNumber = numberWithCallingCode;
                result.contactName = data.contactName;
                result.save();

                localStorage.setItem(`successfulEdit-${req.params.org}`, true)
                localStorage.removeItem(`companyData-${hash}`);
                res.redirect('/jobs/' + slug); 
            } else {
                return res.status(404);
            }
            // next(err);
        });
    });

    // Render the view
    view.render('editorgprofile_contactdetails');
};
