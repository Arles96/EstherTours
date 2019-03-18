import '../../components/packageRoomHotel/packageRoomHotel';
import '../../components/packageRouteTE/packageRouteTE';
import '../../components/packageFleetRenters/packageFleetRenters';
import '../../components/packageRestaurants/packageRestaurants';
import './editPackages.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { PackagesSchema } from '../../../api/packages/packages';
import { RoomHotel } from '../../../api/hotels/roomhotel';
import { FleetRenter } from '../../../api/renters/fleetRenter';
import { restaurantOffers } from '../../../api/restaurants/restaurantOffers';
import { Attractions } from '../../../api/attractions/attractions';
import { Tours } from '../../../api/tours/tours';

Template.editPackages.onRendered(function createVars () {
  Session.set('packageHotelId', this.data.package.idHotel);
  Session.set('packageRoomId', this.data.package.idRoom);
  Session.set('packageTEId', this.data.package.idTransport);
  Session.set('packageRouteId', this.data.package.idTransportRoute);
  Session.set('packageRenterId', this.data.package.idRenter);
  Session.set('packageFleetId', this.data.package.idFleetRenter);
  Session.set('packageRestaurantId', this.data.package.idRestaurant);
  Session.set('packageAttractionId', this.data.package.idAttraction);
  Session.set('packageToursId', this.data.package.idTour);
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
  restaurant: () => Session.get('packageRestaurantId'),
  attraction: () => Session.get('packageAttractionId'),
  tour: () => Session.get('packageToursId'),
  initNum: function (fieldValue) {
    if (!fieldValue) {
      return 0;
    }
    return fieldValue;
  },
  calcPriceLabel: function (numAdults, numChildren, numNights) {
    let price = 0.0;

    const packageRoomId = Session.get('packageRoomId');
    const packageFleetId = Session.get('packageFleetId');
    const packageRestaurantId = Session.get('packageRestaurantId');
    const packageAttractionId = Session.get('packageAttractionId');
    const packageToursId = Session.get('packageToursId');

    const descripciones = [];

    // Precio tour
    if (packageToursId) {
      const priceTour = Tours.findOne({ _id: packageToursId }).price;
      const totalPriceTour = priceTour * (numAdults + numChildren);
      price += totalPriceTour;
      descripciones.push({
        label: 'Tour',
        value: `L. ${priceTour} * ${(numAdults + numChildren)} personas = L. ${totalPriceTour}`
      });
    }
    // Precio habitacion
    if (packageRoomId) {
      const priceRoom = RoomHotel.findOne({ _id: packageRoomId }).price;
      const totalPriceRoom = priceRoom * numNights;
      price += totalPriceRoom;
      descripciones.push({
        label: 'Habitacion',
        value: `L. ${priceRoom} * ${(numNights)} noches = L. ${totalPriceRoom}`
      });
    }
    // Precio atraccion
    if (packageAttractionId) {
      const priceAttr = Attractions.findOne({ _id: packageAttractionId }).price;
      const totalPriceAttr = priceAttr * (numAdults + numChildren);
      price += totalPriceAttr;
      descripciones.push({
        label: 'Atraccion',
        value: `L. ${priceAttr} * ${(numAdults + numChildren)} personas = L. ${totalPriceAttr}`
      });
    }
    // Tarifa flota de arrendadora
    if (packageFleetId) {
      const rateFleet = FleetRenter.findOne({ _id: packageFleetId }).rate;
      price += rateFleet;
      descripciones.push({
        label: 'Flota',
        value: `L. ${rateFleet} de tarifa`
      });
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
      let division = 0;
      let totalRest = 0;
      if (count !== 0) {
        division = (total / count);
        totalRest = division * (numAdults + numChildren) * numNights;
        price += totalRest;
      }
      descripciones.push({
        label: 'Restaurante',
        value: `L. ${division} promedio de precio de menu * ${(numAdults + numChildren)} personas * ${numNights} noches = L. ${totalRest}`
      });
    }
    descripciones.push({
      label: 'Total calculado en',
      value: `L. ${price}`
    });
    return descripciones;
  }
});

AutoForm.addHooks('editPackagesForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado la información del paquete exitosamente.');
    Session.set('packageHotelId', undefined);
    Session.set('packageRoomId', undefined);
    Session.set('packageTEId', undefined);
    Session.set('packageRouteId', undefined);
    Session.set('packageRenterId', undefined);
    Session.set('packageFleetId', undefined);
    Session.set('packageRestaurantId', undefined);
    Session.set('packageToursId', undefined);
    Router.go('listPackages');
  },
  onError: function (formtype, error) {
    if (error.error) {
      toastr.error(error.error);
    } else {
      toastr.error(error);
    }
  }
});
