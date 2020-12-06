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
        companyName: localStorage.getItem('loggedInCompany') || "",
    }

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

    // Render the view
    view.render('jobs');
};