const { instances } = require('gstore-node');
const gstore = instances.get('unique-id');
const { Schema } = gstore;

function createCode() {
  var output = "";
  var valid = "0123456789ABCDEFGHIJKLMOPQRSTUVWXYZ";
  for ( var i = 0; i < 4; i++ ) {
    for ( var j = 0; j < 4; j++ ) {
      var index = Math.floor(Math.random() * valid.length);
      var character = valid.substr(index, 1);
      output += character;
    }
    if (i < 3) {
      output += "-";
    }
  }
  return output;
}

const coinSchema = new Schema({
  code: { type: String, required: true },
  coordinates: { type: Schema.Types.GeoPoint, optional: true },
  description: { type: String, optional: true },
  owner: { type: Object, optional: true },
  claimed: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
  value: { type: Schema.Types.Double, default: 0 },
  created: { type: Date, default: gstore.defaultValues.NOW },
  previous: { type: Schema.Types.Double, default: 0 },
  hasPrize: { type: Boolean, default: false },
  forSale: { type: Boolean, default: false },
  price: { type: Number, default: 0 }
});

function populateCode() {
  var _this = this;
  return new Promise((resolve, reject) => {
    if (!_this.code) {
      _this.code = createCode();
    }
    return resolve();
  });
}

coinSchema.pre('save', populateCode);

module.exports = gstore.model('Coin', coinSchema);
