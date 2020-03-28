var keystone = require('keystone');
var Types = keystone.Field.Types;


var Team = new keystone.List('Team', {
    autokey: { from: 'name', path: 'key', unique: true },
    plural: 'Members',
    singular: 'Member',
});

// var myStorage = new keystone.Storage({
//     adapter: keystone.Storage.Adapters.FS,
//     fs: {
//         path: keystone.expandPath('./public/uploads/team'), // required; path where the files should be stored
//         publicPath: '/public/uploads/team', // path where files will be served
//     }
// });



Team.add({
    name: { type: String, initial: true, required: true },
    email: { type: Types.Email, initial: true, required: true },
    occupation: { type: String },
    membership: { type: Types.Relationship, ref: 'TeamCategory', many: true },
    isLeader: { type: Boolean, isRequired: true, defaultValue: false },
    publishedDate: { type: Types.Date, default: Date.now },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'User', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    image: { type: Types.CloudinaryImage, secure: true },
    // image: {
    //     type: Types.File,
    //     storage: myStorage
    // },
    bio: { type: Types.Textarea, },
});

Team.track = true;
Team.defaultSort = 'name';
Team.defaultColumns = 'name, email, publishedDate';
Team.register();