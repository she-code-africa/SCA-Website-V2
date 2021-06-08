require('dotenv').config();

var keystone = require('keystone');
var Job = keystone.list('Job');

exports = module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    
    var locals = res.locals;

    locals.section = 'jobs';
    locals.data = {
        job: {},
        todayDate: new Date(),
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

    //job details
    view.on('init', function (next) {
        Job.model.findOne({ _id: req.params.id })
            .populate({
                path: 'company categories', populate: ['comapny.categories', 'categories'],
            })
            .exec(async function (err, result) {
                if (result != null) {
                    locals.data.job = result;
                } else {
                    return res.status(404).render('errors/404');
                }
                next(err);
            })

    });

    // Render the view
    view.render('jobdetail');
};
