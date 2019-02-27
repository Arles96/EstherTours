import { Meteor } from 'meteor/meteor';
import { userActivities } from './userActivities';

Meteor.methods({
  userLogout: function (doc) {
    userActivities.insert({
      userId: Meteor.userId(),
      user: Meteor.user().profile.firstName,
      activity: 'Cerró sesión',
      collection: 'N/D',
      registerId: 'N/D',
      register: 'N/D',
      date: new Date()
    });
  },
  userLogin: function (doc) {
    userActivities.insert({
      userId: Meteor.userId(),
      user: Meteor.user().profile.firstName,
      activity: 'Inició sesión',
      collection: 'N/D',
      registerId: 'N/D',
      register: 'N/D',
      date: new Date()
    });
  }
});
