var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
});

Post.add({
    title: { type: String, required: true },
    meta: {
        description: { type: Types.Text, min: 0, max: 160 },
    },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'User', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    image: { type: Types.CloudinaryImage },
    imageDescription: { type: Types.Textarea, height: 50 },
    content: {
        brief: { type: Types.Html, wysiwyg: true, height: 150 },
        extended: { type: Types.Markdown, height: 400, markedOptions: { gfm: true } },
    },
    categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
    pageView: { type: Types.Number, default: 0 }
});

Post.schema.virtual('content.full').get(function() {
    return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%, pageView|20%';
Post.register();