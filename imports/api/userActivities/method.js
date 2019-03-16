import { Meteor } from 'meteor/meteor';
import { userActivities } from './userActivities';
import { admin, supervisor } from '../roles/roles';

Meteor.methods({
  userLogout: function (doc) {
    userActivities.insert({
      userId: Meteor.userId(),
      user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
      role: Meteor.user().roles[0],
      activity: 'Cerró sesión',
      collection: 'N/D',
      registerId: 'N/D',
      register: 'N/D',
      date: new Date()
    });
  },
  userLogout2: function (doc) {
    const { firstName, lastName } = Meteor.users.findOne({ _id: doc }).profile;
    userActivities.insert({
      userId: doc,
      user: `${firstName} ${lastName}`,
      role: Meteor.user().roles[0],
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
      user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
      role: Meteor.user().roles[0],
      activity: 'Inició sesión',
      collection: 'N/D',
      registerId: 'N/D',
      register: 'N/D',
      date: new Date()
    });
  },
  activitiesCount: function (selUserId) {
    if (Roles.userIsInRole(Meteor.userId(), supervisor) ||
      Roles.userIsInRole(Meteor.userId(), admin)) {
      const counts = [0, 0, 0];
      counts[0] = userActivities.find({ userId: selUserId, activity: 'agregó' }).count();
      counts[1] = userActivities.find({ userId: selUserId, activity: 'editó' }).count();
      counts[2] = userActivities.find({ userId: selUserId, activity: 'eliminó' }).count();
      return counts;
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  }
});
