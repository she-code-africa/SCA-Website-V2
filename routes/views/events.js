var keystone = require('keystone');

exports = module.exports = function (req, res) {
    
    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.section = 'events';
    locals.data = {
        uevents: [],
        pevents: [],
    };

    //past events
    view.on('init', function (next) {
        var q = keystone.list('Event').model
            .where({
                state: 'published',
                eventDate: { $lt: new Date() },
            });

        q.exec(function(err, result) {
            locals.data.pevents = result;
            next(err);
        });
    });

    //upcoming events
    view.on('init', function (next) {
        var q = keystone.list('Event').model
            .where ({
                state: 'published',
                eventDate: { $gte: new Date() },
            })
            .sort('-publishedDate');

        q.exec(function(err, results) {
            locals.data.uevents = results;
            next(err);
        });
    });
    
    view.render('events');
};