import { Meteor } from 'meteor/meteor';
import { userActivities } from './userActivities';
import { operator, consultant, admin } from '../roles/roles';

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
  },
  activitiesCount: function (selUserId) {
    if (Roles.userIsInRole(Meteor.userId(), operator) ||
      Roles.userIsInRole(Meteor.userId(), consultant) ||
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
