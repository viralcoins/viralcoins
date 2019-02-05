'use strict';

const stripe = require('stripe')('sk_test_0XaTommPdwW4hQuzkGkW6rzS');
const User = require('../models/user.model');
const Coin = require('../models/coin.model');
const Master = require('../models/master.model');

exports.ephemeral_keys = async function(req, res) {
  console.log("ephemeral_keys");
  const user = await User.get(req.user.id);  
  const customer = await createOrGet(user);
  User.update(req.user.id, {customerId: customer.id});
  const apiVersion = req.body.api_version;
  stripe.ephemeralKeys.create(
    { customer: customer.id },
    { stripe_version: apiVersion }, 
    function(err, key) {
      return res.json(key);
    }
  );
}

exports.charge = async function(req, res) {  
  console.log("charge");
  const user = await User.get(req.user.id);  
  const customer = await createOrGet(user);
  User.update(req.user.id, {customerId: customer.id});
  const coin = await Coin.get(req.body.coinId)
  if (coin.forSale) {
    stripe.charges.create({
      amount: req.body.amount,
      currency: 'usd',
      customer: customer.id,
      source: req.body.source,
      description: 'Viral Coin Purchase',
      shipping: req.body.shipping,
      metadata: { coinId: req.body.coinId }
    }, async function(err, charge) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        Coin.update(req.body.coinId,
          {
            forSale: false,
            owner: user.entityKey,
            active: true,
            claimed: true,
            value: 1
          });
        const master = await Master.get(config.app.masterKey).catch(e => console.log(e));
        Master.update(config.app.masterKey, { totalValue: master.totalValue + 1 });
        res.json(charge);
      }
    });
  } else {
    res.status(404).send();
  }
}

async function createOrGet(user) {
  return new Promise((resolve, reject) => {
    if (user.customerId) {
      stripe.customers.retrieve(
        user.customerId,
        function(err, customer) {
          if (err) {
            reject(err);
          } else {
            resolve(customer);
          }
        }
      );
    } else {
      stripe.customers.create({
        description: 'Customer for ' + user.email,
        email: user.email,
        metadata: {
          userId: user.id
        }
      }, function(err, customer) {
        if (err) {
          reject(err);
        } else {
          resolve(customer);
        }
      });    
    }
  });
}