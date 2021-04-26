var keystone = require('keystone');

/**
 * JobCategory Model
 * ==================
 */

var JobCategory = new keystone.List('JobCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

JobCategory.add({
	name: { type: String, required: true },
});

JobCategory.relationship({ ref: 'Job', path: 'jobs', refPath: 'categories' });

JobCategory.register();
