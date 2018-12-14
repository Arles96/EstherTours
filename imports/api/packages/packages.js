import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import { messages } from '../regEx';

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
      console.log(this.field('idFleetRenter'));
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
      console.log(this.value);
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
  idRestaurante: {
    type: String,
    label: 'Restaurante',
    optional: true
  },
  price: {
    type: Number,
    label: 'Precio'
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
  }
}, { check: check, tracker: Tracker });

PackagesSchema.messageBox.messages(messages);

export {
  Packages,
  PackagesSchema
};
