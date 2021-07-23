var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * ProgramCategory Model
 * ==================
 */

var ProgramCategory = new keystone.List('ProgramCategory', {
    autokey: { from: 'name', path: 'key', unique: true },
});

ProgramCategory.add({
    name: { type: String, initial: true, required: true },
    description: { type: Types.Textarea, max: 250 }
});

ProgramCategory.relationship({ ref: 'Program', path: 'programs', refPath: 'categories' });

ProgramCategory.register();