import './updateProfile.html';
import toastr from 'toastr';
import { Meteor } from 'meteor/meteor';
import UpdateProfileSchema from '../../../api/users/updateProfile';

Template.updateProfile.helpers({
  UpdateProfileSchema: () => UpdateProfileSchema,
  user: function () {
    return {
      firstName: Meteor.user().profile.firstName,
      lastName: Meteor.user().profile.lastName
    };
  }
});

AutoForm.addHooks('updateProfileForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado su perfil del usuario exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
