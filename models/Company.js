var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Job Model
 * ==========
 */

var Company = new keystone.List('Company', {
    map: { name: 'companyName' },
    autokey: { path: 'slug', from: 'companyName', unique: true },
});

Company.add({
    companyName: { type: String, initial: true, required: true },
    companyUrl: { type: String, initial: true },
    location: { type: String, initial: true, required: true },
    industry: { type: String, initial: true, required: true },
    address: { type: String, initial: true, required: true },
    contactName: { type: String, initial: true, required: true },
    email: { type: Types.Email, initial: true, required: true, unique: true },
    phoneNumber: { type: String, initial: true, required: true },
    registeredDate: { type: Types.Date, default: Date.now },
    password: { type: Types.Password, initial: true, required: true },
});

Company.relationship({ ref: 'Job', path: 'jobs', refPath: 'company' });

Company.defaultColumns = 'companyName, industry|20%, location|20%, contactName|20%';
Company.register();
