import './dashboardNavbar.html';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Template.dashboardNavbar.events({
  'click #logout': function () {
    Accounts.logout();
    Meteor.call('userLogout');
    window.location = '/';
  }
});
