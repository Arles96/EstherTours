import './updateProfile.html';
import '../../components/uploadImageModal/uploadImageModal';
import toastr from 'toastr';
import { Meteor } from 'meteor/meteor';
import UpdateProfileSchema from '../../../api/users/updateProfile';
import ProfileImage from '../../../api/profileImage/profileImage';

Template.updateProfile.helpers({
  UpdateProfileSchema: () => UpdateProfileSchema,
  user: function () {
    return {
      firstName: Meteor.user().profile.firstName,
      lastName: Meteor.user().profile.lastName
    };
  },
  profileImage: function () {
    const image = Meteor.user() && Meteor.user().profile.profileImage;
    return ProfileImage.findOne({ _id: image });
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
