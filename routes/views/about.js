var keystone = require('keystone');
var Team = keystone.list('Team');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.section = 'about';
    locals.data = {
        teams: [],
        // membership: [],
    };
    view.on('init', function(next) {
        var q = 
        keystone.list('TeamCategory').model.find().exec(function(err, result) {
            locals.data.membership = result;
            next(err);
        });
    });
	view.query('teams', Team.model.find().where('state', 'published').sort('publishedDate').limit(6));
    console.log(locals.data.teams)
    // Render the view
    view.render('about');
};
