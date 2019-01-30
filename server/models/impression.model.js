const request = require('request');
const gstore = require('gstore-node')();
const { Schema } = gstore;
const config = require('../config');

const impressionSchema = new Schema({
  coin: { type: Object },
  user: { type: Object },
  code: { type: String },
  created: { type: Date, default: gstore.defaultValues.NOW }
});

module.exports = gstore.model('Impression', impressionSchema);
