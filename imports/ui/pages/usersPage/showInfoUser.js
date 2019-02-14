import './showInfoUser.html';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import UserProfileSchema from '../../../api/users/profileUsers';
import { branchOffices } from '../../../api/branchOffices/Offices';

Template.showInfoUserModal.helpers({
  UserProfileSchema: () => UserProfileSchema,
  branchOffices: () => (branchOffices.find().map(doc => ({
    label: `${doc.city}`,
    value: doc._id
  }))),
  user: function () {
    const user = Meteor.users.findOne({ _id: Session.get('idUserInfo') });
    if (user) {
      return {
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        email: user.emails[0].address,
        position: user.profile.position,
        role: user.roles[0],
        idOffice: branchOffices.findOne({ _id: user.profile.idOffice }).city
      };
    } else {
      return undefined;
    }
  }
});
