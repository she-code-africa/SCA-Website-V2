var keystone = require('keystone');
var Chapter = keystone.list('Chapter');
var ChapterCategory = keystone.list('ChapterCategory');
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// item in the header navigation.
	locals.section = 'chapters';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.chapterSubmitted = false;
	locals.error = null;
	locals.data = {
		chapters: [],
		category: [],
	};
	var searchQuery = req.body.searchCountry;
	view.on('post', { action: '' }, function (next) {
		Chapter.model.find().where('chapterName', `${searchQuery}`).sort('publishedDate').exec(function (err, result) {
			locals.data.chapters = result;
			// next(err);
		});
		next();
		req.body.searchCountry = '';
	});

	// view.on('init', function (next) {
	// 	keystone.list('ChapterCategory').model.find().exec(function (err, result) {
	// 		locals.data.category = result;
	// 		console.log(result);
	// 		next(err);
	// 	});
	// });
	view.query('category', ChapterCategory.model.find());
	view.query('chapters', Chapter.model.find().where('state', 'published').sort('publishedDate'));
	// Render the view
	view.render('chapters');
};
