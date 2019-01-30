'use strict';

const Coin = require('../models/coin.model');
const User = require('../models/user.model');
const Impression = require('../models/impression.model');
const Master = require('../models/master.model');
const gstore = require('gstore-node')();

exports.read_a_wallet = function(req, res) {
  console.log("read_a_wallet");
  const master = req.app.locals.master;
  var userKey = User.key(gstore.ds.int(req.user.id));  
  Coin.list({filters: ['owner', userKey]}).then(response => {
    let coins = response.entities;
    var totalValue = 0;
    for (let coin of coins) {
      totalValue += coin.value
    }
    const percentage = master.totalValue == 0 ? 0 : totalValue / master.totalValue;
    res.json({
      coins: coins,
      totalValue: totalValue,
      percentage: percentage
    })
  }).catch(err => res.status(400).json(err));
}
