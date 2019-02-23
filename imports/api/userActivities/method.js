import { Meteor } from 'meteor/meteor';
import userActivities from './userActivities';

Meteor.methods({
  userLogout: function (doc) {
    userActivities.insert({
      userId: Meteor.userId(),
      user: Meteor.user().profile.firstName,
      activity: 'Cerró sesión',
      collection: '',
      registerId: '',
      register: '',
      date: new Date()
    });
  },
  userLogin: function (doc) {
    userActivities.insert({
      userId: Meteor.userId(),
      user: Meteor.user().profile.firstName,
      activity: 'Inició sesión',
      collection: '',
      registerId: '',
      register: '',
      date: new Date()
    });
  }
});
