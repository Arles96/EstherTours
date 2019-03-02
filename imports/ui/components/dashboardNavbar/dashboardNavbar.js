import './dashboardNavbar.html';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Template.dashboardNavbar.events({
  'click #logout': function () {
    const userId = Meteor.userId();
    Meteor.call('userLogout2', userId, (error, result) => {
      if(!error){
        Accounts.logout();
      }
    });
    // window.location = '/';
  }
});
