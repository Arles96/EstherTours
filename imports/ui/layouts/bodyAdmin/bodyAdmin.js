import './bodyAdmin.html';
import '../../components/dashboardNavbar/dashboardNavbar';
import '../../components/leftMenu/leftMenu';
import '../../components/scripts/scripts';
import '../../components/breadcrumb/breadcrumb';
import { Meteor } from 'meteor/meteor';

Template.bodyAdmin.helpers({
  isBlocked: function () {
    if (Meteor.user().profile.blocked === true) {
      return true;
    } else {
      return false;
    }
  }
});

Template.bodyAdmin.events({
  'click #logout': function () {
    Accounts.logout();
    window.location = '/';
  }
});
