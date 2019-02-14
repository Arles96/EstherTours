import './officeEdit.html';
import toastr from 'toastr';
import userOfficeSchema from '../../../api/users/officeUser';
import { branchOffices } from '../../../api/branchOffices/Offices';

Template.officeEdit.onCreated(() =>{ 
  Meteor.subscribe('branchOffices.all');
});

Template.officeEdit.helpers({
  userOfficeSchema: () => userOfficeSchema,
  officeUser: () => Session.get('officeUser'),
  branchOffices: () => (branchOffices.find().map(doc => ({
    label: `${doc.city}`,
    value: doc._id
  })))
});

AutoForm.addHooks('editUserForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado los datos de la habitación exitosamente.');
    $('#officeEdit').modal('hide');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
