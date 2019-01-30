const QRCode = require('qrcode');

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

const fs = require('fs');

var output = "";
for (var i = 0; i < 100; i++) {
  const code = createCode();
  const link = "https://viralcoins.co/coin/" + code;
  output += code + "\n";
  const filename = "codes/qr" + i + ".svg";
  QRCode.toFile(filename, link, { scale: 10, type: "svg",   color: {
    dark: '#000',
    light: '#000'
  }});
}

fs.writeFile("codes/output.txt", output, function(err) {
  if(err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});
