'use strict';

const { instances } = require('gstore-node');
const gstore = instances.get('unique-id');

const User = require('../models/user.model');
const Message = require('../models/message.model');
const UserProfile = require('../models/user_profile.model');
const request = require('request');
const config = require('../config');
const jwt = require('jsonwebtoken');
const utils = require('../shared/utils');
const email = require('../shared/email');

console.log(instances.get('unique-id').models);

exports.password_reset = function(req, res) {
  User.findOne({resetToken: req.body.token})
    .then(user => {
      user.password = req.body.password
      user.resetToken = '';
      user.save().then(user => {
        res.status(200).send();
      })
      .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
}

exports.forgot_password = function(req, res) {
  console.log("Forgot email " + req.body.email);
  User.findOne({email: req.body.email})
    .then(user => {
      const token = utils.generateToken(30)
      User.update(user.plain().id, {resetToken: token}).then(user => {
        console.log(user);
        email.send(user.email, {
          "email": "ben@viralcoins.co",
          "name": "Viral Coins"
        }, 'd-82730b7768814c0aa6ad404901d838c2', {
          resetUrl: config.app.rootUrl + '/user/password?resetToken=' + user.resetToken
        });
        res.json({
          status: "success"
        });
      })
      .catch(err => { console.log(err); res.status(400).json(err); });
    })
    .catch(err => { console.log(err); res.status(404).json(err); });
}

exports.read_all_messages = function(req, res) {
  console.log("read_all_messages");
  Message.list()
    .then(response => {
      res.json(response.entities);
    })
    .catch(err => res.status(400).json(err));  
}

exports.read_all_users = function(req, res) {
  console.log("read_all_users");
  User.list()
    .then(response => {
      res.json(response.entities);
    })
    .catch(err => res.status(400).json(err));
}

exports.update_a_user = async function(req, res) {
  let user = {
    email: req.body.email
  };
  let profile = {
    first: req.body.first,
    last: req.body.last
  };
  User.update(req.user.id, User.sanitize(user)).then(async user => {
    try {
      const userProfile = await UserProfile.findOne({user: user.entityKey});      
      UserProfile.update(userProfile.entityKey.id, UserProfile.sanitize(profile)).then(userProfile => {
        let userPlain = user.plain();
        userPlain.profile = userProfile.plain();
        res.json(userPlain);
      }).catch(err => {
        res.status(400).json(err);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  }).catch(err => res.status(400).json(err));
}

exports.read_a_user = async function(req, res) {
  console.log("read_a_user");
  const user = await User.get(req.user.id).catch(err => res.status(404).json(err));
  const userProfile = await UserProfile.findOne({user: user.entityKey}).catch(err => res.status(404).json(err));
  const userPlain = user.plain();
  userPlain.profile = userProfile.plain();
  res.json(userPlain);
}

exports.logout = function(req, res) {
  req.logout();
  req.session = null;
  res.redirect('/');
}

exports.auth = function(req, res) {
  const secret = config.jwt.secret;
  const token = jwt.sign({user: req.user}, secret, {});
  res.json({
    user: req.user,
    token: token
  });
}

exports.is_available = function(req, res) {
  const username = req.params.username;
  User.findOne({username: username}).then(user => {
    const isAvailable = user == null;
    res.json({ isAvailable: isAvailable })
  }).catch( err => {
    res.json({ isAvailable : true })
  });
}

exports.signup = function(req, res) {
  const userJson = User.sanitize(req.body);
  User.findOne({username: userJson.username}).then(user => {
    if (user) {
      res.status(409).send();
    } else {
      var user = new User(userJson);
      user.save().then(user => {
        res.json(user);
      }).catch(err => {
        res.status(400).send(err);
      });
    }
  });
}

exports.send_a_message = function(req, res) {
  console.log(req.body);
  const message = new Message(Message.sanitize(req.body));
  message.user = User.key(gstore.ds.int(req.user.id));
  message.save().then(message => {
    res.json(message);
  }).catch(err => {
    console.log(err);
  });
}

exports.delete_a_message = async function(req, res) {
  console.log("delete_message");
  try {
    Message.delete(req.params.id).then(() => {
      res.json(200);
    });
  } catch (e) {
    console.log(e);
    res.status(400).send();    
  }
}
