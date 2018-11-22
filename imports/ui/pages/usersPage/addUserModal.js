import './addUserModal.html';
import UserProfileSchema from '../../../api/users/profileUsers';

Template.addUserModal.helpers({
  UserProfileSchema: () => UserProfileSchema
});
