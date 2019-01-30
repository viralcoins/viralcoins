const gstore = require('gstore-node')();
const { Schema } = gstore;

const userProfileSchema = new Schema({
  user: { type: Object, required: true },
  ownership: { type: Number, default: 0 },
  totalCoins: { type: Number, default: 0 },
  first: { type: String, optional: true },
  last: { type: String, optional: true }
});

module.exports = gstore.model('UserProfile', userProfileSchema);
