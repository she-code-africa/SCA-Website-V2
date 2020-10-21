var keystone = require('keystone');
var Types = keystone.Field.Types;

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
	categories: { type: Types.Relationship, ref: 'JobCategory', many: true },
	deadline: { type: Types.Date, index: true },
	publishedDate: { type: Types.Date, index: true, default: Date.now },
	minimumExperience: { type: String, initial: true, required: true },
	jobDescription: { type: Types.Textarea },
	applicationLink: { type: String, initial: true, required: true },
	applicationEmail: { type: Types.Email, initial: true, required: true },
	author: { type: Types.Relationship, ref: 'Company', index: true },
});

Job.defaultColumns = 'title, state|20%, deadline|20%, publishedDate|20%';
Job.register();
