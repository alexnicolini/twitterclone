Meteor.publish('tweets', function() {
  if (this.userId) {
    var username = Meteor.users.findOne({_id: this.userId}).username;

    var currentFollowings = UserUtils.findFollowings(username);

    return Tweets.find({user: { $in: currentFollowings }});
  }
});