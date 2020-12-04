var keystone = require('keystone');

/**
 * JobCategory Model
 * ==================
 */

var CompanyCategory = new keystone.List('CompanyCategory', {
    autokey: { from: 'name', path: 'key', unique: true },
});

CompanyCategory.add({
    name: { type: String, required: true },
});

CompanyCategory.relationship({ ref: 'Company', path: 'jobs', refPath: 'categories' });

CompanyCategory.register();