const request = require('request');
const config = require('../config');
const { instances } = require('gstore-node');
const gstore = instances.get('unique-id');
const { Schema } = gstore;

const impressionSchema = new Schema({
  coin: { type: Object },
  user: { type: Object },
  code: { type: String },
  created: { type: Date, default: gstore.defaultValues.NOW }
});

module.exports = gstore.model('Impression', impressionSchema);
