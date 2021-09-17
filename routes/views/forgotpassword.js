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

  view.on('post', { action: '' }, function (next) {
    var data = req.body;
    const q = Company.model.findOne({ email: req.body.email });
    q.exec(function (err, result) {
      if (result === null) {
        locals.validationErrors.email = "No company associated with email";
        return next({ message: 'No company associated with email' });
      } else {
        const companyId = result._id;
        var newResetToken = new Token.model();
        const tokenQuery = Token.model.findOne({ companyId });
        tokenQuery.exec(function (err, result) {
          // TODO: Delete existing token
          // if (result) {
          //   result.delete();
          // }

          let resetToken = crypto.randomBytes(32).toString('hex');
          let updater = newResetToken.getUpdateHandler(req);

          updater.process({ companyId, token: resetToken }, {
              flashErrors: true,
              errorMessage: 'An error occured. Try again',
          }, function (err) {
            if (err) {
              locals.validationErrors = err.errors;
            
            } else {
              locals.resetTokenSaved = true;
            }
            next();
        });
        })
      }
    });
});

  // Render the view
	view.render('forgotpassword');
};
