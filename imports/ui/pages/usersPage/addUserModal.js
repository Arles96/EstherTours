import './addUserModal.html';
import toastr from 'toastr';
import UserProfileSchema from '../../../api/users/profileUsers';
import { branchOffices } from '../../../api/branchOffices/Offices';

Template.addUserModal.onCreated(() => {
  Meteor.subscribe('branchOffices.all');
  Meteor.subscribe('allUsers.all');
  Meteor.subscribe('chats.all');
});

Template.addUserModal.helpers({
  UserProfileSchema: () => UserProfileSchema,
  branchOffices: () => (branchOffices.find().map(doc => ({
    label: `${doc.departament}`,
    value: doc._id
  }))),
  prueba: function () {
    console.log(branchOffices.find().fetch());
    return 'prueba';
  }
});

AutoForm.addHooks('editUserForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha creado el usuario exitosamente.');
  },
  onError: function (formtype, error) {
    if (error.error === 403) {
      toastr.error('Error el correo ya existe.');
    } else {
      toastr.error(error);
    }
  }
});
