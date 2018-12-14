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
    label: 'Arrendadora'
  },
  idFleetRenter: {
    type: String,
    label: 'Flota de Arrendadora',
    optional: true
  },
  idGuide: {
    type: String,
    label: 'Guía',
    optional: true
  },
  idTransport: {
    type: String,
    label: 'Establecimiento de Transporte',
    optional: true
  },
  idTransportRoute: {
    type: String,
    label: 'Ruta del Establecimiento de Transporte',
    optional: true
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
    label: 'Hotel'
  },
  idRoom: {
    type: String,
    label: 'Habitación del Hotel'
  }
}, { check: check, tracker: Tracker });

PackagesSchema.messageBox.messages(messages);

export {
  Packages,
  PackagesSchema
};
