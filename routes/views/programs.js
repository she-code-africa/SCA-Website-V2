var keystone = require('keystone');
var Programs = keystone.list('Program');
var Cohort = keystone.list('ProgramCohort');
var Reach = keystone.list('ProgramReaches');
var Stories = keystone.list('ProgramStories');
var Gallery = keystone.list('ProgramGallery')
exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // item in the header navigation.
    locals.section = 'programs';
    locals.error = null;
    locals.data = {
        programs: [],
        reaches: [],
        stories: [],
        gallery: [],
        past: [],
        current: [],
        upcoming: []
    };

    view.query('programs', Programs.model.find());
    view.query('reaches', Reach.model.find());
    view.query('stories', Stories.model.find());
    view.query('gallery', Gallery.model.find());
    //past
    view.query('past', Cohort.model.find().where({
        state: 'published',
        endDate: { $lt: new Date() },
    }).sort('-endDate'))

    //current
    view.query('current', Cohort.model.find().where({
            state: 'published',
            endDate: { $gte: new Date() },
        })
        .sort('-endDate'));

    //upcoming
    view.query('upcoming', Cohort.model.find().where({
            state: 'published',
            startDate: { $gte: new Date() },
        })
        .sort('-startDate'));



    //format date

    // const d = new Date('2010-08-05')
    // const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    // const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
    // const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

    // console.log(`${da}-${mo}-${ye}`)

    // Render the view
    view.render('programs');
};