var keystone = require('keystone');
var ProgramCategory = keystone.list('ProgramCategory');
exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.section = 'programs';
    locals.data = {
        upcomingPrograms: [],
        pastPrograms: [],
        categories: []
    };

    //get categories
    view.query('categories', ProgramCategory.model.find());

    // past programs
    view.on('init', function(next) {
        var q = keystone.list('Program').model
            .where({
                state: 'archived',
                startDate: { $lt: new Date() },
            })
            .sort('-startDate');;

        q.exec(function(err, result) {
            locals.data.pastPrograms = result;
            next(err);
        });
    });

    // upcoming programs
    view.on('init', function(next) {
        var q = keystone.list('Program').model
            .where({
                state: 'upcoming',
                startDate: { $gte: new Date() },
            })
            .sort('-startDate');

        q.exec(function(err, results) {
            locals.data.upcomingPrograms = results;
            next(err);
        });
    });

    view.render('programs');
};