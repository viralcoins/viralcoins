const { instances } = require('gstore-node');
const gstore = instances.get('unique-id');
const { Schema } = gstore;

const prizeSchema = new Schema({
  coin: { type: Object },
  type: { type: String },
  created: { type: Date, default: gstore.defaultValues.NOW },
  redeemed: { type: Boolean, default: false },
  addressRequired: { type: Boolean, default: false }
});

module.exports = gstore.model('Prize', prizeSchema);
