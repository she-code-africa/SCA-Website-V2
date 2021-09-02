var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Program Reaches  Model
 * ==========
 */


var ProgramReaches = new keystone.List('ProgramReaches', {
    autokey: { from: 'name', path: 'key', unique: true },
});

ProgramReaches.add({
    name: { type: String, initial: true, required: true },
    count: { type: Number, initial: true, required: true },
    category: { type: Types.Relationship, ref: 'ProgramCategory', many: true },

});

ProgramReaches.defaultSort = 'name';
ProgramReaches.defaultColumns = 'name, count, category';
ProgramReaches.register();