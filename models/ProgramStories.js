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
    categories: { type: Types.Relationship, ref: 'ProgramCategory' },

});


ProgramStories.defaultColumns = 'name, position, image,  categories';
ProgramStories.register();