var keystone = require('keystone');

exports = module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.section = 'testimonials';

    //load Testimonials
    view.query('testimonials', keystone.list('Testimonial').model.find());

    //render the view
    view.render('testimonials');
}
