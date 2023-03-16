var keystone = require('keystone');
var Donation = keystone.list('Donation');


exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // item in the header navigation.
    locals.section = 'partners';
    locals.data = {
        fund: {},
    };
    // view.on('init', function(next) {
    //     Donation.model.find().exec(function(err, result) {
    //         locals.data.fund = result;
    //         next(err);
    //     });
    // });
    view.query('fund', Donation.model.find());
    // Render the view
    view.render('donatepartner');
};