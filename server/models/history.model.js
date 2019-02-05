const { instances } = require('gstore-node');
const gstore = instances.get('unique-id');
const { Schema } = gstore;

function getDate() {
  var d = new Date();
  d.setHours(0,0,0,0);
  return d;
}

const historySchema = new Schema({
  coin: { type: Object },
  value: { type: Schema.Types.Double, default: 1 },
  created: { type: Date, default: getDate }
});

module.exports = gstore.model('History', historySchema);
