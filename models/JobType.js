var keystone = require('keystone');

/**
 * JobType Model
 * ==================
 */

var JobType = new keystone.List('JobType', {
  autokey: { from: 'name', path: 'key', unique: true },
});

JobType.add({
  name: { type: String, required: true },
});

JobType.relationship({ ref: 'Job', path: 'jobs', refPath: 'job-types' });

JobType.register();
