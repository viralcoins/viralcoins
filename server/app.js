'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const gstore = require('gstore-node')();
const Datastore = require('@google-cloud/datastore');
const errorhandler = require('errorhandler');
const config = require('./config.js');
const Master = require('./models/master.model');

const datastore = new Datastore({
    projectId: config.google.projectId,
});

// Then connect gstore to the datastore instance
gstore.connect(datastore);

Master.list().then(response => {
	if (response.entities.length == 0) {
		const master2 = new Master();
		master2.save((err, resp) => {
			app.locals.master = resp;
		});
	} else {
		app.locals.master = response.entities[0];
	}
});

app.use(errorhandler({ log: errorNotification }));
function errorNotification(err, str, req) {
  console.log('ERROR', err);
}
app.use('/', express.static('dist'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(passport.initialize());

var myLogger = function (req, res, next) {
  const output = new Date() + " - " + req.url;
  next()
}

app.use(myLogger);

require('./routes/routes.js')(app);
require('./security/security')(app, passport)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
