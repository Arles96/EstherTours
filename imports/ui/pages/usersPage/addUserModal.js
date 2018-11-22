import './addUserModal.html';
import toastr from 'toastr';
import UserProfileSchema from '../../../api/users/profileUsers';

Template.addUserModal.helpers({
  UserProfileSchema: () => UserProfileSchema
});

AutoForm.addHooks('addUserForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha creado el usuario exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
