var express = require('express');

var MongoClient = require('mongodb').MongoClient;

var format = require('util').format;

var dbResult;

// MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err, db) {
// MongoClient.connect('mongodb://172.17.0.11:27017/test', function (err, db) {
MongoClient.connect('mongodb://172.17.0.11/test', function (err, db) {

    if (err) throw err;

    var collection = db.collection('test_insert');
    collection.insert({a:2}, function(err, docs) {
        collection.count(function(err, count) {
            console.log(format("count = %s", count));
            db.close();
        });
    });

    // Locate all the entries using find
    collection.find().toArray(function(err, results) {

        // console.dir(results);
        dbResult = results;
        // Let's close the db
        db.close();
    });
});


var app = express();

app.set('port', (process.env.PORT || 5000))

app.use(express.static(__dirname + '/dist'));

app.get('/settings', function (req, res, next) {
  var msg = dbResult[0]._id;
  res.send(msg);
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
