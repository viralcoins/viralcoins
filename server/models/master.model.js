const gstore = require('gstore-node')();
const { Schema } = gstore;

const masterSchema = new Schema({
  totalCoins: { type: Number, default: 0 },
  totalValue: { type: Number, default: 0 },
  cash: { type: Schema.Types.Double, default: 0 }
});

module.exports = gstore.model('Master', masterSchema);
