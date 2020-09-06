var keystone = require('keystone');
var Chapter = keystone.list('Chapter');
var ChapterCategory = keystone.list('ChapterCategory')
exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // item in the header navigation.
    locals.section = 'chapters';
    locals.data = {
        chapters: [],
        category: [],
    };
    // view.on('init', function(next) {
    //     keystone.list('ChapterCategory').model.find().exec(function(err, result) {
    //         locals.data.category = result;
    //         next(err);
    //     });
    // });
    view.query('category', ChapterCategory.model.find());
    view.query('chapters', Chapter.model.find().where('state', 'published').sort('publishedDate'));

    // Render the view
    view.render('chapters');
};