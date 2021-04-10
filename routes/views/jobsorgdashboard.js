require('dotenv').config();

const cons = require('consolidate');
var keystone = require('keystone');
const { keys } = require('lodash');
var localStorage = require('../../utils/localStorage');
var Job = keystone.list('Job');
var paginate = require('../../utils/paginate');

exports = module.exports = function (req, res) {
    const { cookieTag } = req.decoded || {};

    const companyData = localStorage.getItem(`loggedInCompany-${cookieTag}`) 
        ? localStorage.getItem(`loggedInCompany-${cookieTag}`) 
        : "";
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
        company: {},
        allPublishedJobs: {},
        unpublishedJobs: {},
        companyName: localStorage.getItem(`loggedInCompany-${cookieTag}`) || "",
    };
    locals.dateDiff = function (deadline) {
        jobsDeadline = new Date(deadline);
        today = new Date();
        return Math.floor(
            (Date.UTC(jobsDeadline.getFullYear(), jobsDeadline.getMonth(), jobsDeadline.getDate()) 
            - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) ) 
            / (1000 * 60 * 60 * 24)
        );
    };
    locals.paginationMetadataPublished = {};
    locals.paginationMetadataUnpublished = {};

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
    view.on('init', async function (next) {
        let currentPage = req.query.section == 'published' || req.query.section == 'all'
            ? Number(req.query.page) || 1
            : 1;
        let pagesize = Number(process.env.JOBS_PAGE_SIZE);
        let firstPage = 1;
        let totalJobsCount = await Job.model.count({state: 'published', company: locals.data.company}, function (err, count) {
            return count;
        });

        Job.model.find({state: 'published', company: locals.data.company})
            .skip(pagesize * (currentPage - 1))
            .limit(pagesize)
            .sort('publishedDate')
            .populate({
                path: 'company categories', populate: ['comapny.categories', 'categories'],
            })
            .exec(async function (err, results) {
                locals.data.allPublishedJobs = results;
                locals.data.paginationMetadataPublished = await paginate(
                    currentPage,
                    firstPage,
                    pagesize,
                    totalJobsCount
                );
                next(err);
            })
    });

    // all unpublished jobs events
    view.on('init', async function (next) {
        let currentPage = req.query.section == 'unpublished' || req.query.section == 'all'
            ? Number(req.query.page) || 1
            : 1;
        let pagesize = Number(process.env.JOBS_PAGE_SIZE);
        let firstPage = 1;
        let totalJobsCount = await Job.model.count({state: ['draft', 'archived'], company: locals.data.company}, function (err, count) {
            return count;
        });

        Job.model.find({state: ['draft', 'archived'], company: locals.data.company})
            .skip(pagesize * (currentPage - 1))
            .limit(pagesize)
            .sort('publishedDate')
            .populate({
                path: 'company categories', populate: ['comapny.categories', 'categories'],
            })
            .exec(async function (err, results) {
                locals.data.unpublishedJobs = results;
                locals.data.paginationMetadataUnpublished = await paginate(
                    currentPage,
                    firstPage,
                    pagesize,
                    totalJobsCount,
                );
                next(err);
            })
    });
    // Render the view
    view.render('jobsorgdashboard');
};
