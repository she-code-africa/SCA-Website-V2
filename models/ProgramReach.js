var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Program Reaches  Model
 * ==========
 */


var ProgramReaches = new keystone.List('ProgramReaches', {
    autokey: { from: 'content', path: 'key' },
});

ProgramReaches.add({
    content: { type: String, initial: true, required: true },
    position: { type: Number, initial: true, required: true },
});

ProgramReaches.relationship({ ref: 'Program', path: 'programs', refPath: 'reaches' });

ProgramReaches.register();