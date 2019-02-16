import '../../components/packageRoomHotel/packageRoomHotel';
import '../../components/packageRouteTE/packageRouteTE';
import '../../components/packageFleetRenters/packageFleetRenters';
import '../../components/packageRestaurants/packageRestaurants';
import './editPackages.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { PackagesSchema } from '../../../api/packages/packages';

Template.editPackages.onRendered(function createVars () {
  Session.set('packageHotelId', this.data.package.idHotel);
  Session.set('packageRoomId', this.data.package.idRoom);
  Session.set('packageTEId', this.data.package.idTransport);
  Session.set('packageRouteId', this.data.package.idTransportRoute);
  Session.set('packageRenterId', this.data.package.idRenter);
  Session.set('packageFleetId', this.data.package.idFleetRenter);
  Session.set('packageRestaurantId', this.data.package.idRestaurant);
});

Template.editPackages.helpers({
  PackagesSchema: () => PackagesSchema,
  hotel: () => Session.get('packageHotelId'),
  room: () => Session.get('packageRoomId'),
  roomSelected: () => Session.get('packageHotelId') && Session.get('packageRoomId'),
  TE: () => Session.get('packageTEId'),
  route: () => Session.get('packageRouteId'),
  routeSelected: () => Session.get('packageTEId') && Session.get('packageRouteId'),
  renter: () => Session.get('packageRenterId'),
  fleet: () => Session.get('packageFleetId'),
  fleetSelected: () => Session.get('packageRenterId') && Session.get('packageFleetId'),
  restaurant: () => Session.get('packageRestaurantId')
});

AutoForm.addHooks('addPackagesForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado la información del paquete exitosamente.');
    Session.set('packageHotelId', undefined);
    Session.set('packageRoomId', undefined);
    Session.set('packageTEId', undefined);
    Session.set('packageRouteId', undefined);
    Session.set('packageRenterId', undefined);
    Session.set('packageFleetId', undefined);
    Session.set('packageRestaurantId', undefined);
    Router.go('listPackages');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
