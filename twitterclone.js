if (Meteor.isClient) {
  Template.tweetBox.onRendered(function() {
    // numChars starts at 0 
    Session.set('numChars', 0);
  });

  Template.tweetBox.helpers({
    charCount: function () {
      return 140 - Session.get('numChars');
    },

    charClass: function() {
      if (Session.get('numChars') > 140) {
        return 'errCharCount' // css class name
      } else {
        return 'charCount' // css class name
      }
    },

    disableButton: function() {
      if (Session.get('numChars') <= 0 || Session.get('numChars') > 140) {
        return 'disabled';
      }
    }
  });

  Template.tweetBox.events({
    'input #tweetText': function () {
      Session.set('numChars', $('#tweetText').val().length);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
