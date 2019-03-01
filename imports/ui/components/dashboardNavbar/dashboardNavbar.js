import './dashboardNavbar.html';
import { Accounts } from 'meteor/accounts-base';

Template.dashboardNavbar.events({
  'click #logout': function () {
    Accounts.logout();
    window.location = '/';
  }
});
