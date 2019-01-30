const gstore = require('gstore-node')();
const { Schema } = gstore;

const feedItemSchema = new Schema({
  user: { type: Object, optional: true },
  created: { type: Date, default: gstore.defaultValues.NOW },
  type: { type: String, requred: true },
  actionType: { type: String, required: true },
  actionText: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  data: { type: Object, optional: true }
});

module.exports = gstore.model('FeedItem', feedItemSchema);