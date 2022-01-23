var keystone = require('keystone');
exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // item in the header navigation.
    locals.section = 'chapterform';



    // Render the view
    view.render('chapterform');
};