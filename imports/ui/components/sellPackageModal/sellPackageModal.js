import './sellPackageModal.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { SoldPackageSchema } from '../../../api/packages/soldPackage';

Template.sellPackageModal.helpers({
  SoldPackageSchema: () => SoldPackageSchema,
  price: () => Session.get('soldPackagePrice'),
  namePackage: () => Session.get('soldPackageName'),
  idPackage: () => Session.get('soldPackageId')
});

AutoForm.addHooks('addSoldPackageForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha agregado la habitación exitosamente.');
    $('#sellPackageModal').modal('hide');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
