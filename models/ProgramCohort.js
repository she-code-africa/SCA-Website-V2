var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Cohort Model
 * ==========
 */

var ProgramCohort = new keystone.List('ProgramCohort', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
});
ProgramCohort.add({
    program: { type: Types.Relationship, ref: 'Program', many: true, required: true, initial: true },
    title: { type: String, required: true },
    cohort: { type: String, required: true, initial: true },
    description: { type: Types.Markdown, initial: true, required: true, height: 100, markedOptions: { gfm: true } },
    state: { type: Types.Select, options: 'draft,published,archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'User', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    image: { type: Types.CloudinaryImage, label: 'Ímage(500x500)' },
    startDate: { type: Types.Date, },
    endDate: { type: Types.Date, },
    callToAction: { type: String, },
    link: { type: String, label: 'Link( https://)' },



});

ProgramCohort.defaultColumns = '  title,cohort,program|20%, state|20%, startDate|20%, endDate|20%';
ProgramCohort.register();