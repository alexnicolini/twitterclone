Meteor.methods({
  'findUser': function(username) {
    return Meteor.users.findOne({
      username: username
    }, {
      fields: { 
        'username': 1 // inclui somente um campo específico nos documentos do resultado
      }
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