var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Chapter Model
 * ==========
 */

var Chapter = new keystone.List('Chapter', {
    map: { name: 'chapterName' },
    autokey: { path: 'slug', from: 'chapterName', unique: true },
});
Chapter.add({
    chapterName: { type: String, initial: true, required: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'User', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    location: { type: String, initial: true, required: true },
    country: { type: String, initial: true, required: true },
    socialMediaLink: { type: String, initial: true, required: true },
    categories: { type: Types.Relationship, ref: 'ChapterCategory', many: true },
});

Chapter.defaultColumns = 'chapterName, categories|20%, location|20%, country, state|20%,  publishedDate|20%, socialMediaLink';
Chapter.register();