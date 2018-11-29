import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import departments from '../departments/departments';
import { messages, RegExObj } from '../regEx';

const Restaurants = new Mongo.Collection('restaurants');

SimpleSchema.extendOptions(['autoform']);

const RestaurantSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre',
    regEx: RegExObj.lettersAndNumbers
  },
  email: {
    type: String,
    label: 'Correo',
    regEx: RegExObj.email
  },
  street: {
    type: String,
    label: 'Calle'
  },
  municipality: {
    type: String,
    label: 'Municipio',
    regEx: RegExObj.names
  },
  city: {
    type: String,
    label: 'Ciudad',
    regEx: RegExObj.names
  },
  department: {
    type: String,
    label: 'Departamento',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => departments
    }
  },
  rating: {
    type: String,
    optional: true,
    label: 'Categorización',
    autoform: {
      readonly: true,
      omit: true,
      afFieldInput: {
        type: 'hidden'
      },
      afFormGroup: {
        label: false
      }
    }
  },
  telephone: {
    type: String,
    label: 'Teléfono',
    regEx: RegExObj.phone
  },
  services: {
    type: Array,
    label: 'Información de Servicios'
  },
  'services.$': {
    type: String
  },
  paymentMethods: {
    type: Array,
    label: 'Métodos de Pago'
  },
  'paymentMethods.$': {
    type: String
  },
  money: {
    type: Array,
    label: 'Monedas'
  },
  'money.$': {
    type: String
  },
  menages: {
    type: Array,
    label: 'Menajes',
    required: false
  },
  'menages.$': {
    type: String
  },
  ambience: {
    type: Array,
    label: 'Ambiente',
    required: false
  },
  'ambience.$': {
    type: String
  },
  menu: {
    type: Array,
    label: 'Menu',
    required: false
  },
  'menu.$': {
    type: String
  },
  numbersTables: {
    type: Number,
    label: 'N. de Mesas',
    regEx: RegExObj.isNumber
  },
  numbersChairs: {
    type: Number,
    label: 'N. de Sillas',
    regEx: RegExObj.isNumber
  },
  numbersChairsBabies: {
    type: Number,
    label: 'N. de Sillas para Bebés',
    regEx: RegExObj.isNumber
  },
  maxPersonCapacity: {
    type: Number,
    label: 'Capacidad Máxima de Personas',
    regEx: RegExObj.Number
  },
  facilityPeople: {
    type: Boolean,
    label: 'Facilidades para Discapacitados'
  },
  bar: {
    type: Boolean,
    label: 'Barra'
  },
  waitingRoom: {
    type: Boolean,
    label: 'Sala de Espera'
  }

}, { check: check, tracker: Tracker });

RestaurantSchema.messageBox.messages(messages);

export {
  RestaurantSchema,
  Restaurants
};
