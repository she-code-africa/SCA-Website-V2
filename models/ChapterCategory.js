var keystone = require('keystone');

/**
 * ChapterCategory Model
 * ==================
 */

var ChapterCategory = new keystone.List('ChapterCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ChapterCategory.add({
	name: { type: String, initial: true, required: true },
});

ChapterCategory.relationship({ ref: 'Chapter', path: 'chapters', refPath: 'categories' });

ChapterCategory.register();
