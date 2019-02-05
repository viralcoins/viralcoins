const { instances } = require('gstore-node');
const gstore = instances.get('unique-id');
const { Schema } = gstore;

const messageSchema = new Schema({
  user: { type: Object, required: true },
  content: { type: String, required: true },
  created: { type: Date, default: gstore.defaultValues.NOW }
});

module.exports = gstore.model('Message', messageSchema);
