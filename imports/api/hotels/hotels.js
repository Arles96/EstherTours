import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
// import { messages, RegExObj } from '../regEx';
import departments from '../departments/departments';

SimpleSchema.extendOptions(['autoform']);

const Hotels = new Mongo.Collection('hotels');

const HotelSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre'
    // regEx: RegExObj.names
  },
  street: {
    type: String,
    label: 'Calle'
    // regEx: RegExObj.names
  },
  municipality: {
    type: String,
    label: 'Municipio'
    // regEx: RegExObj.names
  },
  departament: {
    type: String,
    label: 'Departamento',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => departments
    }
  },
  phone: {
    type: String,
    label: 'Teléfono'
    // regEx: RegExObj.phone
  },
  categorization: {
    type: Number,
    label: 'Categorización'
    // regEx: RegExObj.names
  },
  coin: {
    type: Array,
    label: 'Monedas aceptadas'
  },
  'coin.$': {
    type: String,
    label: 'Moneda'
  },
  services: {
    type: Array,
    label: 'Servicios'
  },
  'services.$': {
    type: String,
    label: 'Servicios'
  },
  paymentsMethod: {
    type: Array,
    label: 'Metodos de pago'
  },
  'paymentsMethod.$': {
    type: String,
    label: 'Metodos de pago'
  },
  informationsAB: {
    type: Array,
    label: 'Información A y B'
  },
  'informationsAB.$': {
    type: String,
    label: 'Información A y B'
  },
  activities: {
    type: Array,
    label: 'Actividades'
  },
  'activities.$': {
    type: String,
    label: 'Actividades'
  }
}, { check: check, tracker: Tracker });

// HotelSchema.messageBox.messages(messages);

export { HotelSchema, Hotels };
