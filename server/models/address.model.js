const gstore = require('gstore-node')();
const { Schema } = gstore;

const addressSchema = new Schema({
  user: { type: Object, required: true },
  line1: { type: String, required: true },
  line2: { type: String, optional: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true }
});

addressSchema.methods.build = function() {
  return this.line1 + " " + this.line2 + " " + this.city + ", " + this.state + " " + this.zip;
}

module.exports = gstore.model('Address', addressSchema);
