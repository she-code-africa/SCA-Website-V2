var keystone = require('keystone');
var Program = keystone.list('Program');

exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);

    var locals = res.locals;

    locals.section = 'program';
    locals.data = {
        program: {},
    };
    // view.query('program', Program.model.findOne().where('_id', req.params.id))

    view.on('init', function(next) {
        Program.model.findOne()
            .where('slug', req.params.slug)
            .exec(function(err, result) {
                locals.program = result;
                let s = new Date(result.startDate)
                let e = new Date(result.endDate)
                s.setDate(s.getDate() + 1);
                e.setDate(e.getDate() + 1);
                let str = (s.toUTCString()).split(" ");
                let str2 = (e.toUTCString()).split(" ");
                locals.program.start = str[0] + " " + str[1] + " " + str[2] + ", " + str[3]
                locals.program.end = str2[0] + " " + str2[1] + " " + str2[2] + ", " + str2[3]

                next(err);
            });
    });
    // Render the view
    view.render('program');
};