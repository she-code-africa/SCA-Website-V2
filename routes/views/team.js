var keystone = require('keystone');
// var async = require('async');
var Team = keystone.list('Team');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'team';
    locals.data = {
        teams: [],
        membership: [],
    };


    // Render the view
    view.render('team');
};