const { select } = require('async');
const cons = require('consolidate');
var keystone = require('keystone');
const { result } = require('lodash');
var JobCategory = keystone.list('JobCategory');
var Company = keystone.list('Company');
var Job = keystone.list('Job');
var localStorage = require('../../utils/localStorage');

exports = module.exports = function (req, res) {
    const { cookieTag } = req.decoded || {};
    const companyData = localStorage.getItem(`loggedInCompany-${cookieTag}`) || "";
    if (companyData === "") {
        return res.redirect('/jobs');
    }

    var view = new keystone.View(req, res);
    var locals = res.locals;
    const today = new Date().toISOString().split('T')[0];
    const oneYearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0];

    // item in the header navigation.
    locals.section = 'jobs';
    locals.data = {
        categories: [],
        today,
        oneYearFromNow,
    };
    locals.formData = req.body || {};
    locals.company = [];

    view.on('init', function (next) {
        Company.model.findOne()
            .where('slug', companyData)
            .exec(function (err, result) {
                locals.company = result;
                next(err);
            });
    });

    view.on('init', function (next) {
        JobCategory.model.find().sort('name').exec(function (err, result) {
            locals.data.categories = result;
            next(err);
        });
    });

    view.on('post', { action: '' }, function (next) {
        var newJob = new Job.model();
        var data = req.body;
        data.company = locals.company;
        newJob.getUpdateHandler(req).process(data, {
            flashErrors: true,
        }, function (err) {
            if (err) {
                locals.validationErrors = err.errors;
                req.flash('error', err.errors);
            } else {
                data.specialization = ''
                req.flash('success', 'Added');
                localStorage.setItem('successMessages', newJob.title);
                return res.redirect('/success');
            }
            next();
        });
    });

    // Render the view
    view.render('jobdetails');
};