var async = require('async'),
    keystone = require('keystone');
var exec = require('child_process').exec;

var FileData = keystone.list('Team');

/**
 * List Files
 */
exports.list = function(req, res) {
    FileData.model.find(function(err, items) {

        if (err) return res.apiError('database error', err);

        res.apiResponse({
            collections: items
        });

    });
}

/**
 * Get File by ID
 */
exports.get = function(req, res) {

    FileData.model.findById(req.params.id).exec(function(err, item) {

        if (err) return res.apiError('database error', err);
        if (!item) return res.apiError('not found');

        res.apiResponse({
            collection: item
        });

    });
}


/**
 * Update File by ID
 */
exports.update = function(req, res) {
    FileData.model.findById(req.params.id).exec(function(err, item) {
        if (err) return res.apiError('database error', err);
        if (!item) return res.apiError('not found');

        var data = (req.method == 'POST') ? req.body : req.query;

        item.getUpdateHandler(req).process(data, function(err) {

            if (err) return res.apiError('create error', err);

            res.apiResponse({
                collection: item
            });

        });
    });
}

/**
 * Upload a New File
 */
exports.create = function(req, res) {

    var item = new FileData.model(),
        data = (req.method == 'POST') ? req.body : req.query;

    item.getUpdateHandler(req).process(req.files, function(err) {

        if (err) return res.apiError('error', err);

        res.apiResponse({
            file_upload: item
        });

    });
}

/**
 * Delete File by ID
 */
exports.remove = function(req, res) {
    var fileId = req.params.id;
    FileData.model.findById(req.params.id).exec(function(err, item) {

        if (err) return res.apiError('database error', err);

        if (!item) return res.apiError('not found');

        item.remove(function(err) {

            if (err) return res.apiError('database error', err);

            //Delete the file
            exec('rm public/uploads/team/' + fileId + '.*', function(err, stdout, stderr) {
                if (err) {
                    console.log('child process exited with error code ' + err.code);
                    return;
                }
                console.log(stdout);
            });

            return res.apiResponse({
                success: true
            });
        });

    });
}