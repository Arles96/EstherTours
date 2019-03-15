import './bodyAdmin.html';
import '../../components/dashboardNavbar/dashboardNavbar';
import '../../components/leftMenu/leftMenu';
import '../../components/scripts/scripts';
import '../../components/breadcrumb/breadcrumb';
import '../../components/ChatSide/ChatSide';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

Template.bodyAdmin.helpers({
  ShowChatFixed: () => Session.get('ShowChatFixed') === true,
  isBlocked: function () {
    const validate = Meteor.user();
    if (validate) {
      if (validate.profile.blocked === true) {
        return true;
      }
    }
    return false;
  }
});

Template.bodyAdmin.events({
  'click #logout': function () {
    Accounts.logout();
    window.location = '/';
  }
});
