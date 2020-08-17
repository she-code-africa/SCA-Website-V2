var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Event Model
 * ==========
 */

var Event = new keystone.List('Event', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});
Event.add({
	title: { type: String, required: true },
	description: { type: Types.Markdown, initial: true, required: true, height: 100, markedOptions: { gfm: true } },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage, initial: true, required: true },
	eventDate: { type: Types.Date, initial: true, required: true },
	location: { type: String, initial: true, required: true },
	registrationLink: { type: String, initial: true },
	eventGalleryLink: { type: String, initial: true },
});

Event.defaultColumns = 'title, state|20%, eventDate|20%, publishedDate|20%';
Event.register();
