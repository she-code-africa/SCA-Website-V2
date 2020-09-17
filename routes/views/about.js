var keystone = require('keystone');
var Team = keystone.list('Team');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.section = 'about';
    locals.data = {
        teams: [],
    };
    
    view.query('teams', Team.model.find().where('state', 'published').sort('publishedDate').limit(6));

    // Render the view
    view.render('about');
};
