const cons = require('consolidate');
var keystone = require('keystone');
const { keys } = require('lodash');
var localStorage = require('../../utils/localStorage');
var Job = keystone.list('Job');

exports = module.exports = function (req, res) {
    const companyData = localStorage.getItem('loggedInCompany') || "";
    if (companyData === "") {
        return res.redirect('/jobs');
    } else if (companyData !== req.params.org) {
        return res.redirect('/jobs/' + companyData);
    }

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // item in the header navigation.
    locals.section = 'jobs';
    locals.data = {
        company: [],
        jobs: [],
        ujobs: [],
    };

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

    // all published jobs events
    view.on('init', function (next) {
        Job.paginate({
            page: req.query.page || 1,
            perPage: 5,
            filters: {
                company: locals.data.company,
            },

        }).where('state', 'published')
            .sort('publishedDate')
            .populate({
                path: 'company categories', populate: ['comapny.categories', 'categories'],
            })
            .exec(function (err, results) {
                locals.data.jobs = results;
                next(err);
            })
    });

    // all unpublished jobs events
    view.on('init', function (next) {
        Job.paginate({
            page: req.query.page || 1,
            perPage: 5,
            filters: {
                company: locals.data.company,
            },

        }).where('state', 'draft')
            .sort('publishedDate')
            .populate({
                path: 'company categories', populate: ['comapny.categories', 'categories'],
            })
            .exec(function (err, results) {
                locals.data.ujobs = results;
                next(err);
            })
    });
    // Render the view
    view.render('jobsorgdashboard');
};