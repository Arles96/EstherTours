import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import { RegExObj, messages } from '../regEx';
import { Guide } from '../guide/guide';
import { Hotels } from '../hotels/hotels';
import { RoomHotel } from '../hotels/roomhotel';
import { Renters } from '../renters/renters';
import { FleetRenter } from '../renters/fleetRenter';
import { Restaurants } from '../restaurants/restaurants';
import { TransportationEstablishments } from '../TransportationEstablishment/TransportationEstablishment';
import { RouteTransportationEstablishment } from '../TransportationEstablishment/RouteTransportationEstablishment';

const Packages = new Mongo.Collection('packages');

SimpleSchema.extendOptions(['autoform']);

const PackagesSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre'
  },
  idRenter: {
    type: String,
    optional: true,
    label: 'Arrendadora',
    custom: function () {
      if (this.value !== undefined && this.field('idFleetRenter').isSet === false) {
        return 'existFleetRenter';
      } else {
        return 1;
      }
    }
  },
  idFleetRenter: {
    type: String,
    label: 'Flota de Arrendadora',
    optional: true,
    custom: function () {
      if (this.value !== undefined && this.field('idRenter').isSet === false) {
        return 'existRenter';
      } else {
        return 1;
      }
    }
  },
  idGuide: {
    type: String,
    label: 'Guía',
    optional: true
  },
  idTransport: {
    type: String,
    label: 'Establecimiento de Transporte',
    optional: true,
    custom: function () {
      if (this.value !== undefined && this.field('idTransportRoute').isSet === false) {
        return 'existRouteTransport';
      } else {
        return 1;
      }
    }
  },
  idTransportRoute: {
    type: String,
    label: 'Ruta del Establecimiento de Transporte',
    optional: true,
    custom: function () {
      if (this.value !== undefined && this.field('idTransport').isSet === false) {
        return 'existTransport';
      } else {
        return 1;
      }
    }
  },
  idRestaurant: {
    type: String,
    label: 'Restaurante',
    optional: true
  },
  idHotel: {
    type: String,
    label: 'Hotel',
    optional: true,
    custom: function () {
      if (this.value !== undefined && this.field('idRoom').isSet === false) {
        return 'existRoomHotel';
      } else {
        return 1;
      }
    }
  },
  idRoom: {
    type: String,
    label: 'Habitación del Hotel',
    optional: true,
    custom: function () {
      if (this.value !== undefined && this.field('idHotel').isSet === false) {
        return 'existHotel';
      } else {
        return 1;
      }
    }
  },
  price: {
    type: Number,
    label: 'Precio',
    regEx: RegExObj.isNumber,
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
  },
  numAdults: {
    type: Number,
    label: 'Numero de adultos',
    regEx: RegExObj.isNumber,
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
  },
  numChildren: {
    type: Number,
    label: 'Numero de niños',
    regEx: RegExObj.isNumber,
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
  },
  numNights: {
    type: Number,
    label: 'Numero de noches',
    regEx: RegExObj.isNumber,
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
  },
  observation: {
    type: String,
    label: 'Observación',
    optional: true,
    autoform: {
      type: 'textarea'
    }
  },
  createAt: {
    type: Date,
    optional: true,
    autoValue: () => new Date()
  }
}, { check: check, tracker: Tracker });

PackagesSchema.messageBox.messages(messages);

Packages.attachSchema(PackagesSchema);

Packages.helpers({
  textHotel: function () {
    const hotel = Hotels.findOne({ _id: this.idHotel });
    return `${hotel.name}, ${hotel.municipality}, ${hotel.departament}`;
  },
  textRoomHotel: function () {
    const room = RoomHotel.findOne({ _id: this.idRoom });
    return `${room.type}, L. ${room.price.toFixed(2)}`;
  },
  textRenters: function () {
    const renter = Renters.findOne({ _id: this.idRenter });
    return `${renter.name}, ${renter.municipality}, ${renter.department}`;
  },
  textFleetRenter: function () {
    const fleetRenter = FleetRenter.findOne({ _id: this.idFleetRenter });
    return `${fleetRenter.type}, L. ${fleetRenter.rate.toFixed(2)}`;
  },
  textTransport: function () {
    const transport = TransportationEstablishments.findOne({ _id: this.idTransport });
    return `${transport.name}, ${transport.town}, ${transport.department}`;
  },
  textRouteTransport: function () {
    const route = RouteTransportationEstablishment.findOne({ _id: this.idTransportRoute });
    return `${route.city}, ${route.type}`;
  },
  textRestaurant: function () {
    const restaurant = Restaurants.findOne({ _id: this.idRestaurant });
    return `${restaurant.name}, ${restaurant.municipality}, ${restaurant.department}`;
  },
  textGuide: function () {
    const guide = Guide.findOne({ _id: this.idGuide });
    return `${guide.name}, ${guide.municipality}, ${guide.department}`;
  },
  textPrice: function () {
    return this.price.toFixed(2);
  }
});

export {
  Packages,
  PackagesSchema
};
