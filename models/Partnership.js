var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Partnership Model
 * =============
 */

var Partnership = new keystone.List('Partnership', {
    nocreate: true,
    noedit: true,
});

Partnership.add({
    first_name: { type: Types.Name, required: true },
    last_name: { type: Types.Name, required: true },
    email: { type: Types.Email, required: true },
    company: { type: String },
    details: { type: Types.Markdown, required: true },
    createdAt: { type: Date, default: Date.now },
});

Partnership.schema.pre('save', function(next) {
    this.wasNew = this.isNew;
    next();
});

Partnership.schema.post('save', function() {
    if (this.wasNew) {
        this.sendNotificationEmail();
    }
});

Partnership.schema.methods.sendNotificationEmail = function(callback) {
    if (typeof callback !== 'function') {
        callback = function(err) {
            if (err) {
                console.error('There was an error sending the notification email:', err);
            }
        };
    }

    if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
        console.log('Unable to send email - no mailgun credentials provided');
        return callback(new Error('could not find mailgun credentials'));
    }

    var partnership = this;
    var brand = keystone.get('brand');

    keystone.list('User').model.find().where('isAdmin', true).exec(function(err, admins) {
        if (err) return callback(err);
        new keystone.Email({
            templateName: 'partnership-notification',
            transport: 'mailgun',
        }).send({
            to: admins,
            from: {
                name: 'She Code Africa',
                email: 'contact@she-code-africa.com',
            },
            subject: 'New Partnership Request for She Code Africa',
            partnership: partnership,
            brand: brand,
        }, callback);
    });
};

Partnership.defaultSort = '-createdAt';
Partnership.defaultColumns = 'first_name, last_name, email, company, details, createdAt';
Partnership.register();