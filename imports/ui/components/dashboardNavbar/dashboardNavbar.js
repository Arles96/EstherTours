import './dashboardNavbar.html';
import { Accounts } from 'meteor/accounts-base';

import userActivities from '../../../api/userActivities/userActivities';

Template.dashboardNavbar.events({
  'click #logout': function () {
    Accounts.logout();
    window.location = '/';
    userActivities.insert({
      userId: Meteor.userId(),
      user: Meteor.user().profile.firstName,
      activity: 'Cerró sesión',
      collection: '',
      registerId: '',
      register: '',
      date: new Date()
    });
  }
});
