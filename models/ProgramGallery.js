var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ProgramGallery Model
 * =============
 */

var ProgramGallery = new keystone.List('ProgramGallery', {
    autokey: { from: 'program', path: 'key', unique: true },
    plural: 'Albums',
    singular: 'Album',
});

ProgramGallery.add({
    program: { type: Types.Relationship, ref: 'Program', many: true, required: true, initial: true },
    publishedDate: { type: Date, default: Date.now },
    images: { type: Types.CloudinaryImages },
});
ProgramGallery.defaultColumns = 'program, publishedDate';
ProgramGallery.register();