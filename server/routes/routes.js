'use strict';

var passport = require('passport');
const request = require('request');
const jwt = require('jsonwebtoken');

function isLoggedIn(req, res, next) {
  passport.authenticate('jwt', { session: false })(req, res, next);
}

function isAdmin(req, res, next) {
  return [
    passport.authenticate('jwt', { session: false })(req, res, next),
    function(req, res, next) {
      if (req.isAuthenticated() && req.user.admin == true) {
        return next();
      }
      res.status(401).send("Unauthorized");
    }
  ]
}

module.exports = function(app) {
  var feed = require('../controllers/feed_controller');
  var users = require('../controllers/users_controller');
  var coins = require('../controllers/coins_controller');
  var wallet = require('../controllers/wallet_controller');
  var stripe = require('../controllers/stripe_controller');

  var root = '/api';

  app.route(root + '/user/all')
    .get(isAdmin, users.read_all_users);

  app.route(root + '/user')
    .post(isLoggedIn, users.update_a_user)
    .get(isLoggedIn, users.read_a_user)

  app.route(root + '/user/logout')
    .get(isLoggedIn, users.logout)

  app.route(root + '/user/auth')
    .post(passport.authenticate('local'), users.auth)

  app.route(root + '/user/signup')
    .post(users.signup)

  app.route(root + '/user/:username')
    .get(users.is_available)    

  app.route(root + '/password/forgot')
    .post(users.forgot_password)

  app.route(root + '/password/reset')
    .post(users.password_reset)

  app.route(root + '/coins/drop')
    .post(isAdmin, coins.coin_drop)

  app.route(root + '/coins/all')
    .get(isAdmin, coins.read_all_coins);

  app.route(root + '/coins/available')
    .get(coins.read_available_coins);

  app.route(root + '/coin')
    .put(isAdmin, coins.create_a_coin)
    .post(isAdmin, coins.update_a_coin)

  app.route(root + '/coins/sale')
    .get(coins.read_sale_coins)

  app.route(root + '/coin/sell')
    .post(coins.sell_a_coin)

  app.route(root + '/coin/unlist')
    .post(coins.unlist_a_coin)

  app.route(root + '/coin/:code/qr')
    .get(coins.show_qr)

  app.route(root + '/coin/claim')
    .post(isLoggedIn, coins.claim_a_coin)

  app.route(root + '/coin/promote')
    .post(isLoggedIn, coins.promote_a_coin)

  app.route(root + '/coin/:id/activate')
    .get(isAdmin, coins.activate_a_coin)

  app.route(root + '/coin/impression/:code')
    .get(isLoggedIn, coins.get_impression)

  app.route(root + '/coin/offer')
    .put(isLoggedIn, coins.offer)

  app.route(root + '/coin/offer/:id')
    .get(isLoggedIn, coins.get_offer)
    .post(isLoggedIn, coins.offer_status)

  app.route(root + '/coin/offers')
    .get(isLoggedIn, coins.get_offers)

  app.route(root + '/coin/:code')
    .get(coins.read_a_coin)
    .delete(isAdmin, coins.delete_a_coin)    

  app.route(root + '/wallet')
    .get(isLoggedIn, wallet.read_a_wallet)

  app.get(root + '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email', 'openid'] }));

  app.get(root + '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/signup?error=duplicate' }),
    function(req, res) {
      var opts = {};
      opts.expiresIn = 1200;
      const secret = "SECRET_KEY"
      const token = jwt.sign({user: req.user}, secret, opts);
      res.redirect('/auth?token='+token);
    });

  app.route(root + '/prize/:coinId')
    .get(coins.read_a_prize)

  app.route(root + '/prize')
    .post(isAdmin, coins.update_a_prize)

  app.route(root + '/prize/redeem')
    .post(isLoggedIn, coins.redeem_a_prize)

  app.route(root + '/message')
    .post(isLoggedIn, users.send_a_message)

  app.route(root + '/message/:id')
    .delete(isAdmin, users.delete_a_message)

  app.route(root + '/messages')
    .get(isAdmin, users.read_all_messages)

  app.route(root + '/feed')
    .get(isLoggedIn, feed.get_feed)    

  app.route(root + '/feed/:id')
    .delete(isLoggedIn, feed.delete_item)

  app.route(root + '/ephemeral_keys')
    .post(isLoggedIn, stripe.ephemeral_keys)

  app.route(root + '/charge')
    .post(isLoggedIn, stripe.charge)
}
