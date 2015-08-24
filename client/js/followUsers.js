Template.followUsers.helpers({
  'foundUser': function () {
    return Session.get('foundUser');
  },

  'recommendedUsers': function() {
    return Session.get('recommendedUsers');
  }  
});

Template.followUsers.events({
  'submit form': function (event) {
    var searchUser = event.target.searchUser.value;

    var foundUser = Meteor.call('findUser', searchUser, function(err, res) {
      if (res) Session.set('foundUser', true);
    });
    return false;
  },

  'click #follow': function() {
    Meteor.call('followUser', Session.get('foundUser').username);
  },

  'click #followRec': function(event) {
    Meteor.call('followUser', this.username);
  }
});

Template.followUsers.onRendered(function() {
  Meteor.call('recommendedUsers', function(err, res) {
    Session.set('recommendedUsers', res);
  });
});