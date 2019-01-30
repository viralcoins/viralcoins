const gstore = require('gstore-node')();
const bcrypt = require('bcrypt');
const utils = require('../shared/utils');

const { Schema } = gstore;
const UserProfile = require('./user_profile.model');

const validatePassword = (value, validator) => {
  return true;
}

const isUsernameUnique = (value, validator) => {
  const user = gstore.model('User').findOne({username: value}).catch(err => {});
  return user ? true : false;
  return false;
}

const userSchema = new Schema({
  username: { type: String, required: true, validate: {
    rule: isUsernameUnique
  } },
  email: { type: String, required: true, validate: 'isEmail' },
  password: { type: String, required: true, validate: {
    rule: validatePassword
  }, read: false },
  admin: { type: Boolean, default: false, write: false },
  created: { type: Date, default: gstore.defaultValues.NOW },
  googleId: { type: String, optional: true },
  resetToken: { type: String, optional: true, read: false },
  verifyToken: { type: String },
  verified: { type: Boolean, default: false },
  customerId: { type: String }
});

function generateVerifyToken() {
  const _this = this;
  if (this.verifyToken || this.entityKey.id) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    _this.verifyToken = utils.generateToken(30);
    return resolve();
  });
}

function hashPassword() {
  const _this = this;
  const password = this.password;

  if (!password || this.entityKey.id) {
      return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function(err, hash) {
      if (err) {
          return reject(err);
      };
      _this.password = hash;
      return resolve();
    });
  });
}

userSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
}

userSchema.methods.getProfile = function() {
  return this.model('UserProfile').findOne({user: this.entityKey});
}

function createProfile() {
  return new Promise(async (resolve, reject) => {
    let userProfile = await UserProfile.findOne({user: this.entityKey}).catch(err => {console.log('Creating UserProfile')});
    if (!userProfile) {
      let userProfile = new UserProfile();
      userProfile.user = this.entityKey;
      userProfile.save(function(err, userProfile) {
        if (err) console.log(err);
        resolve();
      });
    }
  });
}

userSchema.pre('save', hashPassword);
userSchema.pre('save', generateVerifyToken);
userSchema.post('save', createProfile);

module.exports = gstore.model('User', userSchema);
