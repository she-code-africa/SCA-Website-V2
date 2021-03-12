var keystone = require('keystone');
var Job = keystone.list('Job');
var localStorage = require('../../utils/localStorage');


exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;


    // item in the header navigation.
    locals.section = 'jobs';
    locals.data = {
        jobs: [],
        todayDate: new Date(),
        company: [],
        companyName: localStorage.getItem('loggedInCompany') || "",
    },
    locals.loggedOutUser = null

    //company details
    view.on('init', function (next) {
        var q = keystone.list('Company').model.findOne({ slug: localStorage.getItem('loggedInCompany') });

        q.exec(function (err, result) {
            if (!err) {
                locals.data.company = result; 
            }
            next(err);
        });

    });

    view.on('init', function (next) {
        Job.paginate({
            page: req.query.page || 1,
            perPage: 7,
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

    //check if user got to this page after a logout
    view.on('init', function (next) {
        const loggedOutUser = localStorage.getItem('loggedOutUser');

        if (loggedOutUser === 'true') {
            localStorage.removeItem('loggedOutUser');
            locals.loggedOutUser = true;
        }
        next();
    });

    // Render the view
    view.render('jobs');
};