var keystone = require('keystone');
var Types = keystone.Field.Types;
var Company = keystone.list('Company');

/**
 * Reset password token Model
 * =============
 */

var Token = new keystone.List('Token');

Token.add({
    companyId: { type: Types.Relationship, ref: 'Company', many: false },
    token: { type: Types.Password, initial: true, required: true },
    createdAt: {
      type: Types.Date,
      default: Date.now,
      expires: 86400,// this is the expiry time in seconds
    },
});

Token.schema.methods.sendResetLinkEmail = async function (token, callback) {
  if (typeof callback !== 'function') {
    callback = function(err) {
        if (err) {
            console.error('There was an error sending reset link email:', err);
            // return callback(new Error('There was an error sending reset link email'));
        }
    };
  }

  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    console.log('Unable to send email - no mailgun credentials provided');
    return callback(new Error('could not find mailgun credentials'));
  }

  let company;
  let { companyId } = this;
  let brand = keystone.get('brand');
  await Company.model.findById(companyId).exec(function (err, result) {
    if (result != null) {
      company = {
        email: result.email,
        name: { first: result.companyName },
      };
    }
  });
  const link = `${process.env.CLIENT_URL}/passwordReset?token=${token}&id=${companyId}`;

  new keystone.Email({
    templateName: 'reset-password-notification',
    transport: 'mailgun',
  }).send({
      to: company,
      from: {
          name: brand,
          email: 'contact@she-code-africa.com',
      },
      subject: 'Password Reset Link',
      token: token,
      link: link,
  }, callback);
};

Token.register();
