var keystone = require('keystone');

/**
 * ProgramCategory Model
 * ==================
 */

var ProgramCategory = new keystone.List('ProgramCategory', {
    autokey: { from: 'name', path: 'key', unique: true },
});

ProgramCategory.add({
    name: { type: String, required: true },
});

ProgramCategory.relationship({ ref: 'Program', path: 'programs', refPath: 'categories' });

ProgramCategory.register();