import './bodyAdmin.html';
import '../../components/dashboardNavbar/dashboardNavbar';
import '../../components/leftMenu/leftMenu';
import '../../components/scripts/scripts';
import '../../components/breadcrumb/breadcrumb';
import '../../components/ChatSide/ChatSide';
import { Meteor } from 'meteor/meteor';

Template.bodyAdmin.helpers({
});

Template.bodyAdmin.events({
  'click #logout': function () {
    Accounts.logout();
    window.location = '/';
  }
});
