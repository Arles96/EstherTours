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
    type: Array,
    label: 'Teléfono'
  },
  'telephone.$': {
    type: Number,
    label: 'Teléfono',
    regEx: RegExObj.isNumber
  },
  services: {
    type: Array,
    label: 'Información de Servicios'
  },
  'services.$': {
    type: String,
    label: 'Servicio'
  },
  paymentMethods: {
    type: Array,
    label: 'Métodos de Pago'
  },
  'paymentMethods.$': {
    type: String,
    label: 'Método de pago'
  },
  money: {
    type: Array,
    label: 'Monedas'
  },
  'money.$': {
    type: String,
    label: 'Moneda'
  },
  menages: {
    type: Array,
    label: 'Menajes'
  },
  'menages.$': {
    type: String,
    label: 'Menaje'
  },
  ambience: {
    type: Array,
    label: 'Ambiente'
  },
  'ambience.$': {
    type: String
  },
  menu: {
    type: Array,
    label: 'Menu'
  },
  'menu.$': {
    type: String
  },
  numbersTables: {
    type: Number,
    label: 'N. de Mesas',
    regEx: RegExObj.isNumber,
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
  },
  numbersChairs: {
    type: Number,
    label: 'N. de Sillas',
    regEx: RegExObj.isNumber,
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
  },
  numbersChairsBabies: {
    type: Number,
    label: 'N. de Sillas para Bebés',
    regEx: RegExObj.isNumber,
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
  },
  maxPersonCapacity: {
    type: Number,
    label: 'Capacidad Máxima de Personas',
    regEx: RegExObj.isNumber,
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
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
Restaurants.attachSchema(RestaurantSchema);

export {
  RestaurantSchema,
  Restaurants
};
