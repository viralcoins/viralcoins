const { instances } = require('gstore-node');
const gstore = instances.get('unique-id');
const { Schema } = gstore;

const masterSchema = new Schema({
  totalCoins: { type: Number, default: 0 },
  totalValue: { type: Number, default: 0 },
  cash: { type: Schema.Types.Double, default: 0 }
});

module.exports = gstore.model('Master', masterSchema);
