var keystone = require('keystone');

/**
 * ProgramCategory Model
 * ==================
 */

var ProgramCategory = new keystone.List('ProgramCategory', {
    autokey: { path: 'key', from: 'name', unique: true },
})

var Types = keystone.Field.Types;

ProgramCategory.add({
    name: { type: String, required: true },
    description: { type: Types.Markdown, initial: true, required: true, height: 100, markedOptions: { gfm: true } },
});

ProgramCategory.relationship({ ref: 'ProgramCategory', path: 'programs', refPath: 'categories' });

ProgramCategory.register();