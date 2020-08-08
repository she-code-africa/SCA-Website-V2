var keystone = require('keystone');
var Types = keystone.Field.Types;


var Team = new keystone.List('Team', {
    autokey: { from: 'name', path: 'key', unique: true },
    plural: 'Members',
    singular: 'Member',
});

Team.add({
	name: { type: String, initial: true, required: true },
	role: { type: String },
    membership: { type: Types.Relationship, ref: 'TeamCategory', many: true },
    isLeader: { type: Boolean, isRequired: true, defaultValue: false },
    publishedDate: { type: Types.Date, default: Date.now },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'User', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    image: { type: Types.CloudinaryImage },
    bio: { type: Types.Textarea, },
});

Team.track = true;
Team.defaultSort = 'name';
Team.defaultColumns = 'name, email, publishedDate';
Team.register();
