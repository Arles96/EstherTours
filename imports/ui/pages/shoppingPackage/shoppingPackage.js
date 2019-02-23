import './shoppingPackage.html';
import '../../components/cardFleetRenter/cardFleetRenter';
import '../../components/cardRestaurant/cardRestaurant';
import '../../components/cardRoomHotel/cardRoomHotel';
import '../../components/cardRouteTransport/cardRouteTransport';
import '../../components/cardAttraction/cardAttraction';
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
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
