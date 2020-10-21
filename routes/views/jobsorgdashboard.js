var keystone = require('keystone');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // item in the header navigation.
    locals.section = 'jobs';
    locals.data = {
        company: {},
    };
    //comapny details
    view.on('init', function (next) {
        var q = keystone.list('Company').model.findOne({ slug: req.params.slug })
    });
    q.exec(function (err, result) {
        if (result != null) {
            locals.data.company = result;
        }
        else {
            return res.status(404);
        }

        next(err);
    });

    // Render the view
    view.render('jobsorgdashboard');
};
