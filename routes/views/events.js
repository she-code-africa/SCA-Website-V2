var keystone = require('keystone');

exports = module.exports = function (req, res) {
    
    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.section = 'events';
    locals.data = {
        uevents: [],
        pevents: [],
    };

    //upcoming events
    view.on('init', function (next) {
        // var q = keystone.list('Event').model.find();
        // q.exec(function(err, results) {
        //     locals.data.uevents = results;
        //     next(err);
        // });
        
		var q = keystone.list('Event').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
			filters: {
                state: 'published',
                eventDate: { $gt: new Date() },

			},
		})
			.sort('-publishedDate');

		q.exec(function (err, results) {
			locals.data.uevents = results;
			next(err);
		});
    });
    
    //past events
    view.on('init', function (next) {
		var q = keystone.list('Event').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
			filters: {
                state: 'published',
                eventDate: { $lte: new Date() },
			},
		})
			.sort('-publishedDate');

		q.exec(function (err, result) {
			locals.data.pevents = result;
			next(err);
		});
	});
    
    console.log(locals.data.uevents.length);
    view.render('events');
};