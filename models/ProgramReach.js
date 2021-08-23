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
    program: { type: Types.Relationship, ref: 'Program', many: true },

});

ProgramReaches.defaultSort = 'name';
ProgramReaches.defaultColumns = 'name, count, program';
ProgramReaches.register();