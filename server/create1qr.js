const QRCode = require('qrcode');

for (var i = 0; i < 100; i++) {
  const link = "https://viralcoins.co/coin/XGA8-A0VM-YIYM-LTCC";
  const filename = "qr.png";
  QRCode.toFile(filename, link, { scale: 1, type: "png",   color: {
    dark: '#000',
    light: '#fff'
  }});
}