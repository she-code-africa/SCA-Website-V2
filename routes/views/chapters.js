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
    // searchQuery = req.body.searchCountry;


    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }

    console.log(req.body.searchCountry);
    view.query('category', ChapterCategory.model.find());
    if (req.body.searchCountry !== "" && req.body.searchCountry !== undefined) {
        searchQuery = titleCase(req.body.searchCountry)
        view.query('chapters', Chapter.model.find().where('country', `${searchQuery}`).where('state', 'published').sort('publishedDate'));

        searchQuery = '';
    } else {
        view.query('chapters', Chapter.model.find().where('state', 'published').sort('publishedDate'));
    }

    // Render the view
    view.render('chapters');
};