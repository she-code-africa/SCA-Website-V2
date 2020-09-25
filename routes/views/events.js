var keystone = require('keystone');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.section = 'events';
    locals.data = {
        upcomingEvents: [],
        pastEvents: [],
    };

    // past events
    view.on('init', function(next) {
        var q = keystone.list('Event').model
            .where({
                state: 'published',
                eventDate: { $lt: new Date() },
            })
            .sort('-eventDate');;

        q.exec(function(err, result) {
            locals.data.pastEvents = result;
            next(err);
        });
    });

    // upcoming events
    view.on('init', function(next) {
        var q = keystone.list('Event').model
            .where({
                state: 'published',
                eventDate: { $gte: new Date() },
            })
            .sort('-eventDate');

        q.exec(function(err, results) {
            locals.data.upcomingEvents = results;
            next(err);
        });
    });

    view.render('events');
};