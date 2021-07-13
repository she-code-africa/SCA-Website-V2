var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Program Model
 * ==========
 */

var Program = new keystone.List('Program', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
});
Program.add({
    title: { type: String, required: true },
    description: { type: Types.Markdown, initial: true, required: true, height: 100, markedOptions: { gfm: true } },
    state: { type: Types.Select, options: 'upcoming archived', default: 'upcoming', index: true },
    image: { type: Types.CloudinaryImage, initial: true, required: true, label: 'Ímage(800x800)' },
    startDate: { type: Types.Date, initial: true, required: true },
    endDate: { type: Types.Date, initial: true, required: true },
    stories: { type: Types.Relationship, ref: 'ProgramStories', many: true },
    reaches: { type: Types.Relationship, ref: 'ProgramReaches', many: true },
});

Program.defaultColumns = 'title, state|20%, startDate|20%, endDate|20%';
Program.register();