var keystone = require('keystone');

/**
 * Program Model
 * ==================
 */

var Program = new keystone.List('Program', {
    map: { name: 'name' },
    autokey: { path: 'slug', from: 'name', unique: true },
})

var Types = keystone.Field.Types;

Program.add({
    name: { type: String, required: true },
    description: { type: Types.Markdown, initial: true, required: true, height: 100, markedOptions: { gfm: true } },
});

Program.relationship({ ref: 'Program', path: 'programs', refPath: 'program' });

Program.register();