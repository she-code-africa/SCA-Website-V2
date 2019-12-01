var keystone = require('keystone');

/**
 * TeamCategory Model
 * ==================
 */

var TeamCategory = new keystone.List('TeamCategory', {
    autokey: { from: 'name', path: 'key', unique: true },
});

TeamCategory.add({
    name: { type: String, required: true },
});

TeamCategory.relationship({ ref: 'Team', path: 'teams', refPath: 'membership' });

TeamCategory.register();