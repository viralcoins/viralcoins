exports.generateToken = function(length) {
  var output = "";
  var valid = "0123456789ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for ( var i = 0; i < length; i++ ) {
    var index = Math.floor(Math.random() * valid.length);
    var character = valid.substr(index, 1);
    output += character;
  }
  return output;
}
