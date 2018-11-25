import './showInfoUser.html';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import UserProfileSchema from '../../../api/users/profileUsers';

Template.showInfoUserModal.helpers({
  UserProfileSchema: () => UserProfileSchema,
  user: function () {
    const user = Meteor.users.findOne({ _id: Session.get('idUserInfo') });
    return {
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      email: user.emails[0].address,
      role: user.roles[0]
    };
  }
});
