var keystone = require('keystone');
var Types = keystone.Field.Types;
// var deepPopulate = require('mongoose-deep-populate')(keystone.mongoose);
// Job.schema.plugin(deepPopulate);

/**
 * Job Model
 * ==========
 */

var Job = new keystone.List('Job', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
});

Job.add({
    title: { type: String, initial: true, required: true },
    categories: { type: Types.Relationship, ref: 'JobCategory', many: false },
    specialization: { type: String },
    deadline: { type: Types.Date, index: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    minimumExperience: { type: String, initial: true, required: true },
    jobDescription: { type: Types.Textarea },
    applicationLink: { type: String, initial: true, required: true },
    // applicationEmail: { type: Types.Email, initial: true, required: true },
    salaryRange: { type: String },
    company: { type: Types.Relationship, ref: 'Company', index: true },
});

Job.defaultColumns = 'title, state|20%, deadline|20%, publishedDate|20%';
Job.register();