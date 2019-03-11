import './addUserModal.html';
import toastr from 'toastr';
import UserProfileSchema from '../../../api/users/profileUsers';
import { branchOffices } from '../../../api/branchOffices/Offices';
import { Position } from '../../../api/position/position';

Template.addUserModal.onCreated(() => {
  Meteor.subscribe('branchOffices.all');
  Meteor.subscribe('allUsers.all');
  Meteor.subscribe('chats.all');
  Meteor.subscribe('position.all');
});

Template.addUserModal.helpers({
  UserProfileSchema: () => UserProfileSchema,
  branchOffices: () => (branchOffices.find().map(doc => ({
    label: `${doc.departament}`,
    value: doc._id
  }))),
  positions: () => (Position.find().map(({ name, _id }) => ({
    label: name,
    value: _id
  })))
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
