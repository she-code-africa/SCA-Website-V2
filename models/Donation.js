var keystone = require('keystone');


var Donation = new keystone.List('Donation', {
    singular: 'Amount',
});

Donation.add({
    currency: { type: String, initial: true, required: true },
    amount: { type: String, initial: true, required: true },

});

Donation.track = true;
Donation.defaultColumns = 'currency, amount';
Donation.register();