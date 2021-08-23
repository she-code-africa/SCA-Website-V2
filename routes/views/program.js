var keystone = require('keystone');
var Program = keystone.list('Program');

exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);

    var locals = res.locals;

    locals.section = 'programs';
    locals.data = {
        program: {},
    };

    view.on('init', function(next) {
        Program.model.findOne({ _id: req.params.id })
            .populate({
                path: 'program stories',
                populate: ['program.stories', 'stories'],
                path: 'program reaches',
                populate: ['program.reaches', 'reaches'],

            })
            .exec(async function(err, result) {
                if (result != null) {
                    locals.data.program = result;
                } else {
                    return res.status(404).render('errors/404');
                }
                next(err);
            })

    });

    // Render the view
    view.render('program');
};