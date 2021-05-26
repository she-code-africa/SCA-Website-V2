var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Testimonial Model
 * ==========
 */


var Testimonial = new keystone.List('Testimonial', {
    autokey: { from: 'name', path: 'key', unique: true },
    plural: 'Testimonials',
    singular: 'Testimonial',
});

Testimonial.add({
    name: { type: String, initial: true, required: true },
    description: { type: Types.Textarea, max: 500, height: 100 },
    image: { type: Types.CloudinaryImage }
});

Testimonial.track = true;
Testimonial.defaultSort = 'name';
Testimonial.defaultColumns = 'name, description';
Testimonial.register();