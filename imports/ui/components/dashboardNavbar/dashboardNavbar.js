import './dashboardNavbar.html';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Template.dashboardNavbar.events({
  'click #logout': function () {
    Meteor.call('userLogout');
    Accounts.logout();
    window.location = '/';
  }
});
