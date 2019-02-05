const User = require('../models/user.model');
const FeedItem = require('../models/feed_item.model');

const { instances } = require('gstore-node');
const gstore = instances.get('unique-id');

exports.get_feed = async function(req, res) {
  const userKey = User.key(gstore.ds.int(req.user.id));
  let options = {};
  options.filters = [
    ['user', userKey]
  ];  
  options.order = [
    { property: 'created', descending: true }
  ];
  try {
    const response = await FeedItem.list(options);
    res.json(response.entities);
  } catch(e) {
    console.log(e);
    res.status(400).send();
  }
}

exports.delete_item = async function(req, res) {
  const userKey = User.key(gstore.ds.int(req.user.id));
  const feedItemKey = FeedItem.key(gstore.ds.int(req.params.id));
  try {
    const feedItem = await FeedItem.findOne({user: userKey, __key__: feedItemKey});    
    FeedItem.delete(feedItem.entityKey.id).then(() => {
      res.json(200);
    });
  } catch (e) {
    console.log(e);
    res.status(400).send();    
  }
}

exports.add_item = async function(req, res) {
  const users = await User.list();
  const feedItems = [];
  for (let user of users.entities) {
    const feedItem = new FeedItem({
      type: req.body.type,
      title: req.body.title,
      text: req.body.text,
      actionText: req.body.actionText,
      data: req.body.data,
      user: user[gstore.ds.KEY]
    });
    feedItems.push(feedItem);
  }
  gstore.save(feedItems).then(() => {
    res.json({status: "success"})
  }).catch(e => {
    res.status(400).send(e);
  });  
}