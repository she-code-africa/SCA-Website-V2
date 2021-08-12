var keystone = require('keystone');
var Types = keystone.Field.Types;
var Company = keystone.list('Company');
// var deepPopulate = require('mongoose-deep-populate')(keystone.mongoose);
// Job.schema.plugin(deepPopulate);

/**
 * Job Model
 * ==========
 */

var Job = new keystone.List('Job', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
});

Job.add({
    title: { type: String, initial: true, required: true },
    categories: { type: Types.Relationship, ref: 'JobCategory', many: false },
    jobType: { type: Types.Relationship, ref: 'JobType', many: false },
    specialization: { type: String },
    deadline: { type: Types.Date, index: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    minimumExperience: { type: String, initial: true, required: true },
    jobDescription: { type: Types.Textarea },
    applicationLink: { type: String, initial: true, required: true },
    // applicationEmail: { type: Types.Email, initial: true, required: true },
    salaryCurrency: { type: String },
    salaryRange: { type: String },
    location: { type: String },
    company: { type: Types.Relationship, ref: 'Company', index: true },
});

async function getNotificationParams (job, callback, includeAdmins = false) {
    let jobOwner;
    let communityManagers;
    const brand = keystone.get('brand');

    if (typeof callback !== 'function') {
        callback = function(err) {
            if (err) {
                console.error('There was an error sending the notification email:', err);
            }
        };
    }

    if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
        console.log('Unable to send email - no mailgun credentials provided');
        return callback(new Error('could not find mailgun credentials'));
    }

    await Company.model.findById(job.company).exec(function (err, result) {
        if (result != null) {
            jobOwner = {
                email: result.email,
                name: { first: result.companyName },
            };
        }
    });

    if (includeAdmins) {
        communityManagers = await keystone.list('Team').model.find({ state: 'published', role: 'Community Manager' });
    }


    return { 
        brand,
        jobOwner,
        modifiedCallback: callback,
        ...(communityManagers && { communityManagers }),
    };
}

Job.schema.methods.sendNewJobNotificationEmail = async function (job, callback) {
    const { brand, jobOwner, communityManagers, modifiedCallback } = await getNotificationParams(job, callback, true);

    keystone.list('User').model.find({
        $and: [
            { 'name.first': { $in: communityManagers.map(function (manager) { return manager.name.split(' ')[0]; }) }},
            { 'name.last': { $in: communityManagers.map(function (manager) { return manager.name.split(' ')[1]; }) }},
        ]
    }).exec(function(err, admins) {
        if (err) return modifiedCallback(err);
        new keystone.Email({
            templateName: 'job-posted-admin-notification',
            transport: 'mailgun',
        }).send({
            to: admins,
            from: {
                name: brand,
                email: 'info@shecodeafrica.org',
            },
            subject: 'A new job is awaiting your approval',
            job,
        }, modifiedCallback);

        new keystone.Email({
            templateName: 'job-posted-notification',
            transport: 'mailgun',
        }).send({
            to: jobOwner,
            from: {
                name: brand,
                email: 'info@shecodeafrica.org',
            },
            subject: 'Your new job posting has been received',
            job,
        }, modifiedCallback);
    });
};

Job.schema.methods.sendPublishedJobNotificationEmail = async function (job, callback) {
    const { brand, jobOwner, modifiedCallback } = await getNotificationParams(job, callback);

    if (jobOwner.email && jobOwner.name) {
        new keystone.Email({
            templateName: 'job-published-notification',
            transport: 'mailgun',
        }).send({
            to: jobOwner,
            from: {
                name: brand,
                email: 'info@shecodeafrica.org',
            },
            subject: 'Your New Job Posting is Now Active',
            job,
        }, modifiedCallback);
    }
};

Job.schema.pre('save', function (next) {
    let job = this;
    if (job.isNew && job.state === 'draft') {
        this.sendNewJobNotificationEmail(job);
    }
    if (job.isModified('state') && job.state === 'published') {
        this.sendPublishedJobNotificationEmail(job);
    }
    return next();
});


Job.defaultColumns = 'title, state|20%, deadline|20%, publishedDate|20%';
Job.register();
