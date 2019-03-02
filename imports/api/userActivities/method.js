import { Meteor } from 'meteor/meteor';
import { userActivities } from './userActivities';

Meteor.methods({
  userLogout: function (doc) {
    userActivities.insert({
      userId: Meteor.userId(),
      user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
      activity: 'Cerró sesión',
      collection: 'N/D',
      registerId: 'N/D',
      register: 'N/D',
      date: new Date()
    });
  },
  userLogout2: function (doc) {
    const { firstName, lastName } = Meteor.users.findOne({ _id: doc }).profile;
    const id = userActivities.insert({
      userId: doc,
      user: `${firstName} ${lastName}`,
      activity: 'Cerró sesión',
      collection: 'N/D',
      registerId: 'N/D',
      register: 'N/D',
      date: new Date()
    });
    console.log(id);
  },
  userLogin: function (doc) {
    userActivities.insert({
      userId: Meteor.userId(),
      user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
      activity: 'Inició sesión',
      collection: 'N/D',
      registerId: 'N/D',
      register: 'N/D',
      date: new Date()
    });
  }
});
