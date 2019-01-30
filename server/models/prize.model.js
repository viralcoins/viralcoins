const gstore = require('gstore-node')();
const { Schema } = gstore;

const prizeSchema = new Schema({
  coin: { type: Object },
  type: { type: String },
  created: { type: Date, default: gstore.defaultValues.NOW },
  redeemed: { type: Boolean, default: false },
  addressRequired: { type: Boolean, default: false }
});

module.exports = gstore.model('Prize', prizeSchema);
