var keystone = require('keystone');
var crypto = require('crypto');
var Company = keystone.list('Company');
var Token = keystone.list('Token');


exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

  locals.formData = req.body || {};
  locals.validationErrors = {};
  locals.resetTokenSaved = false;
  locals.emailLinkError = false;

  view.on('post', { action: '' }, function (next) {
    Company.model.findOne({ email: req.body.email }).exec(async function (err, company) {
      if (company === null) {
        locals.validationErrors.email = "No company associated with email";
        return next({ message: 'No company associated with email' });
      } else {
        const companyId = company._id;
        await Token.model.deleteOne({ companyId });

        let resetToken = crypto.randomBytes(32).toString('hex');
        let updater = new Token.model().getUpdateHandler(req);

        updater.process({ companyId, token: resetToken }, {
          flashErrors: true,
          errorMessage: 'An error occured. Try again',
        }, function (err) {
          if (err) {
            locals.validationErrors = err.errors;
          } else {
            Token.model.findOne({ companyId }).exec(async function (err, newToken) {
              try {
                newToken.sendResetLinkEmail(resetToken);
                locals.resetTokenSaved = true;
              } catch (error) {
                locals.emailLinkError = true;
              }
              res.redirect('/mailSuccess');
            });
          }
          // next();
        });
      }
    });
});

  // Render the view
	view.render('forgotpassword');
};
