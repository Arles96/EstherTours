import { Meteor } from 'meteor/meteor';

Meteor.methods({
  insertUser: function (doc) {
    console.log(doc);
  }
});
