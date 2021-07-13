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
    description: { type: Types.Html, wysiwyg: true, height: 150 },
    image: { type: Types.CloudinaryImage }
});

ProgramStories.relationship({ ref: 'Program', path: 'programs', refPath: 'stories' });

ProgramStories.register();