require('dotenv').config();

var keystone = require('keystone');
var Job = keystone.list('Job');
var localStorage = require('../../utils/localStorage');
var paginate = require('../../utils/paginate');


exports = module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    const clientCookieTag = req.signedCookies.tag;

    // item in the header navigation.
    locals.section = 'jobs';
    locals.data = {
        openJobs: [],
        todayDate: new Date(),
        company: [],
        companyName: localStorage.getItem(`loggedInCompany-${clientCookieTag}`) || "",
    };
    locals.loggedOutCompany = null;
    locals.dateDiff = function (deadline) {
        jobsDeadline = new Date(deadline);
        today = new Date();
        return Math.floor(
            (Date.UTC(jobsDeadline.getFullYear(), jobsDeadline.getMonth(), jobsDeadline.getDate()) 
            - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) ) 
            /(1000 * 60 * 60 * 24));
    };
    locals.paginationMetadata = {};

    //company details
    view.on('init', function (next) {
        var q = keystone.list('Company').model.findOne({ slug: localStorage.getItem(`loggedInCompany-${clientCookieTag}`) });

        q.exec(function (err, result) {
            if (!err) {
                locals.data.company = result; 
            }
            next(err);
        });

    });

    view.on('init', async function (next) {
        let currentPage = Number(req.query.page) || 1;
        let pagesize = Number(process.env.JOBS_PAGE_SIZE);
        let firstPage = 1;

        let totalJobsCount = await Job.model.count({state: 'published', deadline: {$gte: new Date()}}, function (err, count) {
            return count;
        });

        Job.model.find({state: 'published', deadline: {$gte: new Date()}})
            .skip(pagesize * (currentPage - 1))
            .limit(pagesize)
            .sort('publishedDate')
            .populate({
                path: 'company categories', populate: ['comapny.categories', 'categories'],
            })
            .exec(async function (err, results) {
                locals.data.openJobs = results;
                locals.data.paginationMetadata = await paginate(
                    currentPage,
                    firstPage,
                    pagesize,
                    totalJobsCount,
                );

                next(err);
            })
    });

    //check if user got to this page after a logout
    view.on('init', function (next) {
        const loggedOutCompany = localStorage.getItem(`loggedOutCompany-${clientCookieTag}`);

        if (loggedOutCompany === 'true') {
            localStorage.removeItem(`loggedOutCompany-${clientCookieTag}`);
            locals.loggedOutCompany = `loggedOutCompany-${clientCookieTag}`;
            locals.tag = `${clientCookieTag}`

            res.clearCookie('tag')
        }
        next();
    });

    // Render the view
    view.render('jobs');
};