'use strict';

// Libraries
const QRCode = require('qrcode');
const { instances } = require('gstore-node');
const gstore = instances.get('unique-id');

// Models
const Coin = require('../models/coin.model');
const Impression = require('../models/impression.model');
const User = require('../models/user.model');
const UserProfile = require('../models/user_profile.model');
const Prize = require('../models/prize.model');
const History = require('../models/history.model');
const Address = require('../models/address.model');
const Master = require('../models/master.model');
const Offer = require('../models/offer.model');
const FeedItem = require('../models/feed_item.model');

// Utilities
const email = require('../shared/email');
const config = require('../config');

exports.read_a_coin = async function(req, res) {
  const params = { code: req.params.code };
  if ( !req.user || (req.user && req.user.admin == false) ) {
    params.active = true;
  }
  try {
    const coin = await Coin.findOne(params);
    const options = {};
    var d = getDate();
    d.setDate(d.getDate()-5);
    options.filters = [
      ['created', '<=', getDate()],
      ['created', '>', d],
      ['coin', coin.entityKey]
    ];
    options.order = [
      { property: 'created' }
    ]
    var coinObj = coin.plain();
    const response = await History.list(options);
    coinObj.history = response.entities;
    res.json(coinObj);
  } catch (e) {
    res.status(404).send();
  }
}

exports.read_all_coins = async function(req, res) {
  const options = {};
  if (!req.user || (req.user && req.user.admin == false)) {
    options.select = ['coordinates'];
    options.filters = ['claimed', false];
  }
  options.order = { property: 'created', descending: false };
  try {
    const response = await Coin.list(options);
    res.json(response.entities);
  } catch (e) {
    res.status(404).send();
  }
}

exports.read_available_coins = async function(req, res) {
  const options = {};
  options.select = ['coordinates', 'description'];
  options.filters = [
    ['claimed', false],
    ['active', true]
  ];
  options.order = { property: 'created', descending: false };
  try {
    const response = await Coin.list(options);
    res.json(response.entities);
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
}

exports.read_sale_coins = async function(req, res) {
  const options = {};
  options.select = ['price'];
  options.filters = [
    ['forSale', true]
  ];
  try {
    const response = await Coin.list(options);
    res.json(response.entities);
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
}

exports.get_offers = async function(req, res) {
  const offers = [];
  const userKey = User.key(gstore.ds.int(req.user.id));
  const options = {}
  options.filters = [
    ['to', userKey]
  ]
  try {
    const response = await Offer.list(options)
    for (let offer of response.entities) {
      offer.type = "received";
      offers.push(offer);
    }
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
  options.filters = [
    ['from', userKey]
  ]
  try {
    const response = await Offer.list(options)
    for (let offer of response.entities) {
      offer.type = "sent";
      offers.push(offer);
    }
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
  res.json(offers);
}

exports.get_offer = async function(req, res) {
  const userKey = User.key(gstore.ds.int(req.user.id));
  const offerKey = Offer.key(gstore.ds.int(req.params.id));  
  try {
    const offer = await Offer.findOne({__key__: offerKey, to: userKey});
    res.json(offer.plain());
  } catch (e) {
    res.status(404).send();
  }
}

exports.offer = async function(req, res) {
  let coin = null;
  try {
    coin = await Coin.get(req.body.coinId);
  } catch (e) {
    res.status(404).send();
  }
  if (coin && coin.forSale) {
    let offer = null;
    const userKey = User.key(gstore.ds.int(req.user.id));
    try {
      offer = await Offer.findOne({coin: coin.entityKey, from: userKey});    
      Offer.update(offer.entityKey.id, {value: parseInt(req.body.value)}, function(err, offer) {
        res.json(offer.plain());
      })
    } catch (e) {
      console.log(e);
      const newOffer = new Offer({coin: coin.entityKey, from: userKey, to: coin.owner, value: parseInt(req.body.value)});
      offer = await newOffer.save();
      res.json(offer.plain());
    }
    const feedItem = new FeedItem({
      actionText: "View Offer",
      actionType: "view-offer",
      text: "You've received an offer on your coin for $" + req.body.value + ".",
      title: "Offer Received",
      type: "offer-received",
      user: coin.owner,
      data: offer.entityKey
    });
    feedItem.save().catch(err => {
      console.log("Error saving feed item:" + err);
    });
  } else {
    res.status(404).send();
  }
}

exports.offer_status = async function(req, res) {
  const userKey = User.key(gstore.ds.int(req.user.id));
  const offerKey = Offer.key(gstore.ds.int(req.params.id));  
  try {
    const offer = await Offer.findOne({__key__: offerKey, to: userKey});
    Offer.update(offer.entityKey.id, {
      status: req.body.status
    }, function(err, offer) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        const updated = offer.plain()
        if (updated.status == "accepted") {
          const feedItem = new FeedItem({
            type: "offer-accepted",
            title: "Offer Accepted!",
            text: "The offer you made has been accepted. The coin will be added to your wallet once payment is received.",
            actionType: "complete-offer",
            actionText: "Pay Now",
            user: userKey,
            data: offer.entityKey
          });      
          feedItem.save();    
        }
        if (updated.status == "rejected") {
          const feedItem = new FeedItem({
            type: "offer-rejected",
            title: "Offer Rejected",
            text: "The offer you made has been reject. You can make a higher offer on the coin.",
            actionType: "view-offer",
            actionText: "View Offer",
            user: userKey,
            data: offer.entityKey
          });
          feedItem.save();
        }     
        updated.type = "received";
        res.json(updated);
      }
    });
  } catch (e) {
    res.status(404).send();
  }
}

exports.create_a_coin = async function(req, res) {
  var coin = new Coin();
  const latitude = req.body.lat ? req.body.lat : -1;
  const longitude = req.body.long ? req.body.long: -1;
  const geoPoint = gstore.ds.geoPoint({
    latitude: latitude,
    longitude: longitude
  });
  if (req.body.prize) {
    coin.hasPrize = true;
  }
  coin.value = 5;
  coin.price = req.body.price;
  coin.claimed = false;
  coin.coordinates = geoPoint;
  coin.description = req.body.description;
  if (req.body.code) {
    coin.code = req.body.code;
  }
  coin.save().then(async (coin) => {
    if (req.body.prize) {
      var prize = new Prize();
      prize.type = req.body.prize.name;
      prize.addressRequired = req.body.prize.addressRequired;
      prize.coin = coin.entityKey;
      prize.save().catch(err => {
        console.log(err);
      });      
    }
    const master = await Master.get(config.app.masterKey).catch(e => console.log(e));
    updateMaster({ totalCoins: master.totalCoins + 1 });
    res.json(coin.plain());
  }).catch(err => {
    if (err) console.log(err);
  });
};

exports.sell_a_coin = function(req, res) {
  Coin.update(req.body.id, {forSale: true}, async function(err, coin) {
    const users = await User.list();
    const feedItems = [];
    for (let user of users.entities) {
      const feedItem = new FeedItem({
        type: "coin-sale",
        title: "Coin For Sale",
        text: "Oh yeah! A coin has just gone on sale! Get it quickly before someone else does!",
        actionType: "buy",
        actionText: "Buy It",
        user: user[gstore.ds.KEY]
      });
      feedItems.push(feedItem);
    }
    gstore.save(feedItems).then(() => {
      res.status(200).send;
    }).catch(e => {
      res.status(400).send(e);
    });    
    res.json(coin.plain());
  });
}

exports.unlist_a_coin = function(req, res) {
  Coin.update(req.body.id, {forSale: false}, function(err, coin) {
    res.json(coin.plain());
  });
}

exports.update_a_coin = function(req, res) {
  const coin = req.body;
  if (coin.owner) {
    coin.owner = User.key(gstore.ds.int(coin.owner.id));
  }
  Coin.update(coin.id, coin).then(coin => {
    res.json(coin)
  }).catch(err => res.status(404).json(err));
}

exports.read_a_prize = function(req, res) {
  const coinKey = Coin.key(gstore.ds.int(req.params.coinId));
  Prize.findOne({coin: coinKey}).then(prize => {
    res.json(prize.plain())
  }).catch(err => res.status(404).json(err));
}

exports.update_a_prize = function(req, res) {
  const coinKey = Coin.key(gstore.ds.int(req.body.coin));
  Prize.findOne({coin: coinKey}).then(prize => {
    if (prize) {
      prize.type = req.body.type;
      prize.addressRequired = req.body.addressRequired;
      prize.save().then(prize => {
        res.json(prize.plain())
      }).catch(err => {
        res.send(err);
      });
    } else {
      var prize = new Prize();
      prize.type = req.body.type;
      prize.addressRequired = req.body.addressRequired;
      prize.coin = coinKey;
      prize.save().then(prize => {
        res.json(prize.plain());
      }).catch(err => {
        res.send(err);
      });
    }
    Coin.update(req.body.coin, {hasPrize: true});
  });
}

exports.redeem_a_prize = async function(req, res) {
  const coinKey = Coin.key(gstore.ds.int(req.body.coin));
  const userKey = User.key(gstore.ds.int(req.user.id));
  try {
    const user = await User.get(req.user.id);
    const prize = await Prize.findOne({coin: coinKey, redeemed: false});
    const coin = await Coin.findOne({__key__: prize.coin, owner: userKey});
    console.log("Prize " + prize.type + " will be sent");
    coin.hasPrize = false;
    prize.redeemed = true;
    if (prize.addressRequired) {
      var address;
      try {
        address = await Address.findOne({user: userKey});
      } catch (e) {
        const address = new Address(Address.sanitize(req.body.address));
        address.user = userKey;
        await address.save();
      }
    }
    const data = {
      name: "Ben",
      user_id: req.user.id,
      user_email: user.email,
      prize_type: prize.type,
      coin_code: coin.code
    };
    if (prize.addressRequired) {
      data.address_line1 = address.line1;
      data.address_line2 = address.line2;
      data.address_city = address.city;
      data.address_state = address.state;
      data.address_zip = address.zip;
    }
    email.send("ben@viralcoins.co", "ben@viralcoins.co", "d-c38f81b1b46c4bf09019f8a1699a9fb7", data);
    prize.save();
    coin.save();
    res.json(prize.plain());
  } catch (e) {
    console.log(e);
    res.status(404).send(e);
  }
}

exports.delete_a_coin = function(req, res) {
  var coinKey = Coin.key(gstore.ds.int(req.params.code));
  const options = {};
  options.filters = ['coin', '=', coinKey];
  options.select = ['__key__'];
  Impression.list(options).then(response => {
    var ids = [];
    for (let impression of response.entities) {
      ids.push(impression.id);
    }
    if (ids.length > 0) {
      Impression.delete(ids);
    }
  });
  History.list(options).then(response => {
    var ids = [];
    for (let impression of response.entities) {
      ids.push(impression.id);
    }
    if (ids.length > 0) {
      History.delete(ids);
    }
  });
  Prize.list(options).then(response => {
    var ids = [];
    for (let impression of response.entities) {
      ids.push(impression.id);
    }
    if (ids.length > 0) {
      Prize.delete(ids);
    }
  });
  Coin.get(req.params.code).then(async coin => {
    const master = await Master.get(config.app.masterKey).catch(e => console.log(e));
    updateMaster({ totalCoins: master.totalCoins - 1, totalValue: master.totalValue - coin.value });
    Coin.delete(coin.entityKey.id).then(response => {
      res.json(response);
    });    
  });  
}

exports.activate_a_coin = function(req, res) {
  Coin.update(req.params.id, {
    active: true
  }).then(coin => {
    if (coin) {
      res.json(coin.plain());
    } else {
      res.status(404);
    }
  }).catch(err => {
    res.send(err);
  });
}

exports.get_impression = async function(req, res) {
  var coin = await Coin.findOne({code: req.params.code})
    .catch(err => { return res.status(404).send() });
  if (coin.entityKey) {
    var userKey = User.key(gstore.ds.int(req.user.id));
    var impression = await Impression.findOne({coin: coin.entityKey, user: userKey})
      .catch(err => { return res.status(404).send() });
    if (impression.entityKey) {
      res.json(impression.plain());
    } else {
      res.status(404).send();
    }
  } else {
    res.status(404).send();
  }
}

function getDate() {
  var d = new Date();
  d.setHours(0,0,0,0);
  return d;
}

exports.promote_a_coin = async function(req, res) {
  try {
    var coin = await Coin.findOne({code: req.body.code});
    promote(req, res, coin);
  } catch (e) {
    res.status(404).send();
  }
}

exports.claim_a_coin = async function(req, res) {
  if (!req.body.code) {
    res.status(404).send();
  } else {
    var coin = await Coin.findOne({code: req.body.code})
      .catch(err => res.status(404).send());
    if (coin.entityKey) {
      if (coin.claimed) {
        promote(req, res, coin);
      } else {
        claim(req, res, coin);
      }
    } else {
      res.status(404).send();
    }
  }
}

async function claim(req, res, coin) {
  var userKey = User.key(gstore.ds.int(req.user.id));
  UserProfile.findOne({user: userKey}, function(err, userProfile) {
    userProfile.totalCoins = userProfile.totalCoins + 1;
    userProfile.save();
  });
  coin.claimed = true;
  coin.owner = userKey;
  coin.value = 1;
  const master = await Master.get(config.app.masterKey).catch(e => console.log(e));
  updateMaster({ totalValue: master.totalValue + 1 });
  coin.save().then(coin => {
    res.json(coin.plain());
  });
}

async function promote(req, res, coin) {
  var userKey = User.key(gstore.ds.int(req.user.id));
  var impression = await Impression.findOne({coin: coin.entityKey, user: userKey}).catch(err => console.log(err));
  if (impression) {
    res.status(404).send();
  } else {
    var impression = new Impression({
      coin: coin.entityKey,
      code: coin.code,
      user: userKey
    });
    impression.save();
    coin.value = coin.value + 1;
    const master = await Master.get(config.app.masterKey).catch(e => console.log(e));
    updateMaster({ totalValue: master.totalValue + 1 });
    coin.save().then(coin => {
      res.json(coin.plain());
    });
    try {
      var history = await History.findOne({coin: coin.entityKey, created: getDate()})
      history.value = history.value + 1;
      history.save();
    } catch (e) {
      var history = new History({
        coin: coin.entityKey
      });
      history.save();
    }
  }
}

exports.show_qr = function(req, res) {
  const code = req.params.code;
  var link = config.app.rootUrl + "/coin/" + code
  var size = req.query.size ? parseInt(req.query.size) : 2;
  res.type('png');
  QRCode.toFileStream(res, link, {
    scale: size
  }, function (err) {
    if (err) {
      console.error(err)
      return res.send(err)
    }
  });
}

exports.coin_drop = async function(req, res) {
  const users = await User.list();
  const feedItems = [];
  for (let user of users.entities) {
    const feedItem = new FeedItem({
      type: "coin-drop",
      title: "Coin Drop",
      text: "Oh yeah! A coin drop has just taken place!",
      actionType: "map",
      actionText: "Find Coins",
      user: user[gstore.ds.KEY]
    });
    feedItems.push(feedItem);
  }
  gstore.save(feedItems).then(() => {
    res.status(200).send();
  }).catch(e => {
    res.status(400).send(e);
  });
}

async function updateMaster(values) {
  const master = await Master.get(config.app.masterKey).catch(e => console.log(e));
  Master.update(config.app.masterKey, values);
}
