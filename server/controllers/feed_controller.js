const User = require('../models/user.model');
const FeedItem = require('../models/feed_item.model');

const gstore = require('gstore-node')();

exports.get_feed = async function(req, res) {
  console.log("get_feed");
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
  console.log("delete_item");
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