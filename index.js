var express = require('express');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;

var format = require('util').format;

var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/dist'));

var dbResult;
var mongoUrl = (process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/test');

MongoClient.connect(mongoUrl, function (err, db) {

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
        dbResult = results;
        // Let's close the db
        db.close();
    });
});

var dbConn = function(cb) {
  MongoClient.connect(mongoUrl, function (err, db) {
    if (err) throw err;
    cb(db);
  });
}

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/settings', function (req, res, next) {
  dbConn(function(db) {
      var collection = db.collection('settings');
      collection.find().toArray(function(err, results) {
        let data = results[0].count;
        res.send(data);
        db.close();
      });
  })
})

app.post('/settings', function (req, res) {
  dbConn(function(db) {
    var collection = db.collection('settings');
    collection.update({}, req.body, {upsert: true}, function(err, docs) {
      if (err) throw err;
    });
  })
  var msg = 'ok+';
  res.send(msg);
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
