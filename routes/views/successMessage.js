const cons = require('consolidate');
var keystone = require('keystone');
var localStorage = require('../../utils/localStorage');

exports = module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    const clientCookieTag = req.signedCookies.tag;

    locals.data = {
        message: localStorage.getItem('successMessages'),
        companyName: localStorage.getItem(`loggedInCompany-${clientCookieTag}`),
    };

    // item in the header navigation.
    locals.section = 'jobs';

    // Render the view
    view.render('successMessage');
};
