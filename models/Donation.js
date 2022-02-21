var keystone = require('keystone');


var Donation = new keystone.List('Donation', {
    singular: 'Amount',
});

Donation.add({
    fund: { type: String, initial: true, required: true }
});

Donation.track = true;
Donation.defaultColumns = 'fund';
Donation.register();