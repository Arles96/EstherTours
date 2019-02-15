import './bodyAdmin.html';
import '../../components/dashboardNavbar/dashboardNavbar';
import '../../components/leftMenu/leftMenu';
import '../../components/scripts/scripts';
import '../../components/breadcrumb/breadcrumb';
import { Meteor } from 'meteor/meteor';

Template.bodyAdmin.helpers({
  isBlocked: function () {
    const validate = Meteor.users.findOne({ _id: Meteor.userId() });
    if (validate.profile.blocked === true) {
      return true;
    } else {
      return false;
    }
  }
});
