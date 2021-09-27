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

    title: { type: String, required: true, label: 'Title' },

    categories: { type: Types.Relationship, ref: 'ProgramCategory' },
    cohort: { type: String, initial: true },
    content: {
        brief: { type: Types.Textarea, height: 150 },
        extended: { type: Types.Markdown, height: 400, markedOptions: { gfm: true } },
    },
    state: { type: Types.Select, options: 'draft,published,archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'User', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    banner: { type: Types.CloudinaryImage, label: 'Banner(500x500)' },
    startDate: { type: Types.Date, },
    endDate: { type: Types.Date, },
    callToAction: { type: String, },
    link: { type: String, label: 'Link( https://)' },

    images: { type: Types.CloudinaryImages, many: true },

});

Program.schema.virtual('content.full').get(function() {
    return this.content.extended || this.content.brief;
});
// Program.relationship({ ref: 'Program', path: 'programs', refPath: 'program' });
Program.defaultColumns = '  title,cohort,categories|20%,state|20%,  startDate|20%, endDate|20%';
Program.register();