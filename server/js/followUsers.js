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
    })
  }
});