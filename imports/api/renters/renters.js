import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';

const Renters = new Mongo.Collection('renters');

const RentersSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre'
  },
  email: {
    type: String,
    label: 'Correo'
  },
  street: {
    type: String,
    label: 'Calle'
  },
  municipality: {
    type: String,
    label: 'Municipio'
  },
  department: {
    type: String,
    label: 'Departamento'
  },
  telephone: {
    type: String,
    label: 'Teléfono'
  },
  services: {
    type: Array,
    label: 'Información de Servicios'
  },
  'services.$': {
    type: String,
    label: 'Servicio'
  }
});