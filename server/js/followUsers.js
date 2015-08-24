Meteor.methods({
  'findUser': function(userName) {
    return Meteor.users.findOne({
      username: userName
    }, {
      fields: { 'username': 1 }
    });
  },

  'followUser': function(username) {
    Relationships.insert({
      follower: Meteor.user().username,
      following: username
    });
  },

  'recommendedUsers': function() {
    if (Meteor.user()) {
      var currentFollowings = UserUtils.findFollowings(Meteor.user().username);

      var recUsers = Meteor.users.find({
        username: {
          $nin: currentFollowings
        }
      }, {
        fields: { 'username': 1 },
        limit: 5
      }).fetch();

      return recUsers;
    }
  }
});