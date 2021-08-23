var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Program Stories  Model
 * ==========
 */


var ProgramStories = new keystone.List('ProgramStories', {
    autokey: { from: 'name', path: 'key', unique: true },
});

ProgramStories.add({
    name: { type: String, initial: true, required: true },
    position: { type: String, initial: true, required: true },
    content: { type: Types.Markdown, initial: true, required: true, height: 100, markedOptions: { gfm: true } },
    image: { type: Types.CloudinaryImage },
    program: { type: Types.Relationship, ref: 'Program', many: true },

});



ProgramStories.defaultColumns = 'name, position, image,  program';
ProgramStories.register();