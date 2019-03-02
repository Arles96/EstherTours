import './shoppingPackage.html';
import '../../components/cardFleetRenter/cardFleetRenter';
import '../../components/cardRestaurant/cardRestaurant';
import '../../components/cardRoomHotel/cardRoomHotel';
import '../../components/cardRouteTransport/cardRouteTransport';
import '../../components/cardAttraction/cardAttraction';
import '../../components/addSubscription/addSubscription';
import Swal from 'sweetalert2';
import toastr from 'toastr';
import { PackagesSchema } from '../../../api/packages/packages';
import { clearValues } from '../../../startup/client/packageFunction';

Template.shoppingPackage.helpers({
  PackagesSchema: () => PackagesSchema
});

AutoForm.addHooks('addingPackagesForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha creado el paquete exitosamente.');
    clearValues();
    Swal({
      title: 'Agregar suscripción',
      text: `Desea agregar una nueva suscripción?`,
      cancelButtonText: 'NO',
      showCancelButton: true,
      focusCancel: true
    }).then(res => {
      if (res.value) {
        $('#addSubscription').modal('show');
      }
    });
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
