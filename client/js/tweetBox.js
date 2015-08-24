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
    if (Session.get('numChars') <= 0 || 
        Session.get('numChars') > 140 || 
        !Meteor.user()) {
      return 'disabled';
    }
  }
});

Template.tweetBox.events({
  'input #tweetText': function () {
    Session.set('numChars', $('#tweetText').val().length);
  },

  'click button': function() {
    var tweet = $('#tweetText').val();
    $('#tweetText').val('');
    Session.set('numChars', 0);
    if (Meteor.user()) {
      Tweets.insert({ message: tweet, user: Meteor.user().username });
    }
  }
});