Meteor.publishComposite('tweets', function(username) {
  return {
    find: function() {
      // Find de current user's following users
      return Relationships.find({ follower: username });
    },
    children: [{
      find: function(relationship) {
        // Find tweets from followed users
        return Tweets.find({ user: relationship.following });
      }
    }]
  }
});

Meteor.publish('ownTweets', function (username) {
  return Tweets.find({ user: username });
});