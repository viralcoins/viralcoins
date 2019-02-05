'use strict';

const Coin = require('../models/coin.model');
const User = require('../models/user.model');
const Impression = require('../models/impression.model');
const Master = require('../models/master.model');
const { instances } = require('gstore-node');
const gstore = instances.get('unique-id');
const config = require('../config');

exports.read_a_wallet = async function(req, res) {  
  const master = await Master.get(config.app.masterKey).catch(e => console.log(e));
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
