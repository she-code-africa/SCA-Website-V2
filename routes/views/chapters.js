var keystone = require('keystone');
var Chapter = keystone.list('Chapter');
var ChapterCategory = keystone.list('ChapterCategory');
exports = module.exports = function(req, res) {

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
    var searchQuery = '';
    searchQuery = req.body.searchCountry;


    // view.on('init', function (next) {
    // 	keystone.list('ChapterCategory').model.find().exec(function (err, result) {
    // 		locals.data.category = result;
    // 		console.log(result);
    // 		next(err);
    // 	});
    // });
    // console.log(searchQuery);
    view.query('category', ChapterCategory.model.find());
    if (searchQuery !== "" && searchQuery !== undefined) {
        view.query('chapters', Chapter.model.find().where('country', `${searchQuery}`).where('state', 'published').sort('publishedDate'));

        searchQuery = '';
    } else {
        view.query('chapters', Chapter.model.find().where('state', 'published').sort('publishedDate'));
    }

    // Render the view
    view.render('chapters');
};