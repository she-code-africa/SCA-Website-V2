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
    var searchQuery = req.body.searchCountry;
    // view.on('post', { action: '' }, function(next) {
    //     Chapter.model.find().where('country', `${searchQuery}`).sort('publishedDate').exec(function(err, result) {
    //         // console.log(result);
    //         locals.data.chapters = result;

    //         // next(err);
    //     });
    //     next();
    //     req.body.searchCountry = '';
    // });
    // console.log(searchQuery);
    // view.on('init', function (next) {
    // 	keystone.list('ChapterCategory').model.find().exec(function (err, result) {
    // 		locals.data.category = result;
    // 		console.log(result);
    // 		next(err);
    // 	});
    // });
    view.query('category', ChapterCategory.model.find());
    if (searchQuery !== "") {
        view.query('chapters', Chapter.model.find().where('country', `${searchQuery}`).where('state', 'published').sort('publishedDate'));
        req.body.searchCountry = '';
    } else {
        view.query('chapters', Chapter.model.find().where('state', 'published').sort('publishedDate'));
    }

    // Render the view
    view.render('chapters');
};