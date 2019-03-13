import '../../components/packageRoomHotel/packageRoomHotel';
import '../../components/packageRouteTE/packageRouteTE';
import '../../components/packageFleetRenters/packageFleetRenters';
import '../../components/packageRestaurants/packageRestaurants';
import './addPackages.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { PackagesSchema } from '../../../api/packages/packages';
import { RoomHotel } from '../../../api/hotels/roomhotel';
import { FleetRenter } from '../../../api/renters/fleetRenter';
import { restaurantOffers } from '../../../api/restaurants/restaurantOffers';

Template.addPackages.onCreated(() => {
  Session.set('packageHotelId', undefined);
  Session.set('packageRoomId', undefined);
  Session.set('packageTEId', undefined);
  Session.set('packageRouteId', undefined);
  Session.set('packageRenterId', undefined);
  Session.set('packageFleetId', undefined);
  Session.set('packageRestaurantId', undefined);
});

Template.addPackages.helpers({
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
  restaurant: () => Session.get('packageRestaurantId'),
  calcPrice: function (numAdults, numChildren, numNights) {
    let price = 0.0;

    const packageHotelId = Session.get('packageHotelId');
    const packageRoomId = Session.get('packageRoomId');
    const packageRenterId = Session.get('packageRenterId');
    const packageFleetId = Session.get('packageFleetId');
    const packageRestaurantId = Session.get('packageRestaurantId');

    // Precio habitacion
    if (packageHotelId && packageRoomId) {
      price += RoomHotel.findOne({ _id: packageRoomId }).price;
    }
    // Tarifa flota de arrendadora
    if (packageRenterId && packageFleetId) {
      price += FleetRenter.findOne({ _id: packageFleetId }).rate;
    }
    // Promedio ofertas de restaurante
    if (packageRestaurantId) {
      let total = 0.0;
      let count = 0;
      restaurantOffers
        .find({ idRestaurant: packageRestaurantId })
        .forEach(doc => {
          total += doc.price;
          count += 1;
        });
      if (count !== 0) {
        price += (total / count) * numAdults * numChildren * numNights;
      }
    }
    return price;
  }
});

AutoForm.addHooks('addPackagesForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha creado el paquete exitosamente.');
    Session.set('packageHotelId', undefined);
    Session.set('packageRoomId', undefined);
    Session.set('packageTEId', undefined);
    Session.set('packageRouteId', undefined);
    Session.set('packageRenterId', undefined);
    Session.set('packageFleetId', undefined);
    Session.set('packageRestaurantId', undefined);
  },
  onError: function (formtype, error) {
    if (error.error) {
      toastr.error(error.error);
    } else {
      toastr.error(error);
    }
  }
});
