'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const { Gstore, instances } = require('gstore-node');
const { Datastore } = require('@google-cloud/datastore');
const errorhandler = require('errorhandler');
const config = require('./config.js');

const gstore = new Gstore({ errorOnEntityNotFound: false });
const datastore = new Datastore({
  projectId: config.google.projectId,
});

// Then connect gstore to the datastore instance
gstore.connect(datastore);

instances.set('unique-id', gstore);

var myLogger = function (req, res, next) {
  const output = new Date() + " - " + req.url;
  console.log(output)
  next()
}

app.use(myLogger);

app.use(errorhandler({ log: errorNotification }));
function errorNotification(err, str, req) {
  console.log('ERROR', err);
}
app.use('/', express.static('dist'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(passport.initialize());

require('./routes/routes.js')(app);
require('./security/security')(app, passport)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
