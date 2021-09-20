var keystone = require('keystone');
var Company = keystone.list('Company');
var Token = keystone.list('Token');


exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

  locals.formData = req.body || {};
  locals.validationError = '';
  locals.success = false;

  view.on('post', { action: '' }, function (next) {
    const { token, id } = req.query;

    if (locals.formData.newPassword !== locals.formData.confirmPassword) {
      locals.formerror = true;
      req.flash("error", "Passwords Do Not Match.");
      locals.validationError = "Passwords do not match";
      return next({ message: 'Passwords do not match' });
    }

    Token.model.findOne({ companyId: id }).exec(function (err, result) {
      if (result) {
        result._.token.compare(token, function(err, isMatch) {
          if (!err && isMatch) {
            Company.model.findOne({ _id: id }).exec(function (err, result) {
              if (result != null) {
                  result.password = locals.formData.newPassword;
                  result.save();

              } else {
                  return res.status(404);
              }
          })
              return res.redirect('/jobs/org/login');
          } else {
              locals.formerror = true;
              locals.validationError = "Invalid or expired password reset token";
              return next({ message: 'Invalid or expired password reset token' });
          }
        });
      } else {
        locals.validationError = "Invalid or expired password reset token";
        return next({ message: 'Invalid or expired password reset token' });
      }
    });
  });

  // Render the view
	view.render('passwordreset');
};
