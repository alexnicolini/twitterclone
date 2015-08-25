Template.tweetFeed.onCreated(function() {
  this.subscribe('tweets');
});

Template.tweetFeed.helpers({
  'tweetMessage': function () {
    return Tweets.find({}, {
      sort: {timestamp: -1},
      limit: 10
    })
  }
});