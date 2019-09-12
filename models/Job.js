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
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	companyName: { type: String, initial: true, required: true },
	location: { type: String, initial: true, required: true },
	salaryRange: { type: String },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	applicationLink: { type: String, initial: false, required: true },
	categories: { type: Types.Relationship, ref: 'JobCategory', many: true },
});

Job.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Job.defaultColumns = 'title, state|20%, companyName|20%, publishedDate|20%';
Job.register();
