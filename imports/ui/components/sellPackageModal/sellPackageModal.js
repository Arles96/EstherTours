import './sellPackageModal.html';
import '../addSubscription/addSubscription';
import toastr from 'toastr';
import Swal from 'sweetalert2';
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
    if (this.insertDoc.sold) {
      Swal({
        title: 'Agregar suscripción',
        text: `Desea agregar una nueva suscripción de cliente?`,
        cancelButtonText: 'NO',
        showCancelButton: true,
        focusCancel: true
      }).then(res => {
        if (res.value) {
          $('#addSubscription').modal('show');
        }
      });
    }
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
