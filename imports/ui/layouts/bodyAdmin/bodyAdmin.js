import './bodyAdmin.html';
import '../../components/dashboardNavbar/dashboardNavbar';
import '../../components/leftMenu/leftMenu';
import '../../components/scripts/scripts';
import '../../components/breadcrumb/breadcrumb';
import '../../components/ChatSide/ChatSide';
import { Session } from 'meteor/session';

Template.bodyAdmin.helpers({
  ShowChatFixed: () => Session.get('ShowChatFixed') === true
});

Template.bodyAdmin.events({
  'click #logout': function () {
    Accounts.logout();
    window.location = '/';
  }
});
