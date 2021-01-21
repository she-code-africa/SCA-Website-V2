var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');
const https = require('https');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // item in the header navigation.
    locals.section = 'home';
    locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
    locals.formData = req.body || {};
    locals.formerror = false;
    locals.validationErrors = {};
    locals.enquirySubmitted = false;

    view.on('post', { action: '' }, function(next) {
        if (locals.formData['g-recaptcha-response'] === undefined || locals.formData['g-recaptcha-response'] === '' || locals.formData['g-recaptcha-response'] === null) {
            locals.validationErrors = 'There was a problem submitting your feedback';
        } else {
            const secretKey = process.env.CAPTCHA_SECRET_KEY;
            const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + locals.formData['g-recaptcha-response'];

            https.get(verificationURL, function(resp) {
                let data = '';
                // A chunk of data has been received.
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    let body = JSON.parse(data)
                    if (body.success !== undefined && !body.success) {
                        locals.validationErrors = "Failed captcha verification";
                        locals.formerror = true;
                        // console.log(locals.validationErrors)
                        next();
                    } else {
                        if (new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(locals.formData.message)) {
                            locals.validationErrors = "Failed captcha verification";
                            locals.formerror = true;
                            next();
                        } else {
                            var newEnquiry = new Enquiry.model();
                            var updater = newEnquiry.getUpdateHandler(req);

                            updater.process(req.body, {
                                flashErrors: true,
                                fields: 'name, email, message',
                                errorMessage: 'There was a problem submitting your feedback',
                            }, function(err) {
                                if (err) {
                                    locals.validationErrors = err.errors;
                                } else {
                                    locals.enquirySubmitted = true;
                                    setTimeout(() => {
                                        locals.enquirySubmitted = false;
                                    }, 3000)

                                }

                                next();
                            });
                        }
                    }
                });


            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });


        }




    });
    // Render the view
    view.render('index');
};