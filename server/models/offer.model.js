const gstore = require('gstore-node')();
const { Schema } = gstore;

const offerSchema = new Schema({
  coin: { type: Object, required: true },
  from: { type: Object, required: true },
  to: { type: Object, required: true },
  value: { type: Schema.Types.Double, default: 0 },
  status: { type: String, required: true, default: "pending" }
});

module.exports = gstore.model('Offer', offerSchema);
