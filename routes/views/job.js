var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'jobs';
	locals.filters = {
		job: req.params.job,
	};
	locals.data = {
		jobss: [],
	};

	// Load the current job
	view.on('init', function (next) {

		var q = keystone.list('Job').model.findOne({
			state: 'published',
			slug: locals.filters.job,
		}).populate('author categories');

		q.exec(function (err, result) {
			locals.data.job = result;
			next(err);
		});

	});

	// Load other jobs
	view.on('init', function (next) {

		var q = keystone.list('Job').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

		q.exec(function (err, results) {
			// locals.data.posts = results;
			locals.data.jobss = results;
			next(err);
		});

	});

	// Render the view
	view.render('job');
};
