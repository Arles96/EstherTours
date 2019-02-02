import './uploadImageModal.html';
import '../loading/loading';
import toastr from 'toastr';
import { ReactiveVar } from 'meteor/reactive-var';
import ProfileImage from '../../../api/profileImage/profileImage';

Template.uploadImageModal.onCreated(function uploadImage () { // eslint-disable-line
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadImageModal.helpers({
  currentUpload () {
    return Template.instance().currentUpload.get();
  }
});

Template.uploadImageModal.events({
  'submit #UploadProfileImageForm': function (event, templateInstance) {
    event.preventDefault();
    if (event.target.userImageProfile.files && event.target.userImageProfile.files[0]) {
      const imageProfile = ProfileImage.insert({
        file: event.target.userImageProfile.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);
      imageProfile.on('start', () => {
        templateInstance.currentUpload.set(true);
      });
      imageProfile.on('end', (error, fileObj) => {
        if (error) {
          toastr.error('Error');
        } else {
          Meteor.call('updateUserProfileImage', fileObj._id, (err, res) => {
            if (err) {
              toastr.error('Error');
            } else {
              $('#uploadProfileImage').modal('toggle');
              toastr.success('Se guardo exitosamente.');
            }
          });
        }
        templateInstance.currentUpload.set(false);
      });
      imageProfile.start();
    }
  }
});
