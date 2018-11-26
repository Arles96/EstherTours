import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import { messages, RegExObj } from '../regEx';

SimpleSchema.extendOptions(['autoform']);
const Restaurants = new Mongo.Collection('restaurants');

const RestaurantSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre del Restaurante',
    regEx: RegExObj.names
  },
  telephone: {
    type: String,
    label: 'Primer Apellido',
    regEx: RegExObj.phone
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
  city: {
    type: String,
    label: 'Ciudad',
    regEx: RegExObj.names
  },
  municipality: {
    type: String,
    label: 'Municipio',
    regEx: RegExObj.names
  },
  department: {
    type: String,
    label: 'Departamento',
    autoform: {
      afFieldInput: {
        options: ['Atlántida', 'Choluteca', 'Colón', 'Comayagua', 'Copán', 'Cortés', 'El Paraíso', 'Francisco Morazán', 'Gracias a Dios', 'Intibucá', 'Islas de la Bahía', 'La Paz', 'Lempira', 'Ocotepeque', 'Olancho', 'Santa Bárbara', 'Valle', 'Yoro']
      }
    }
  },
  paymentMethods: {
    type: Array,
    optional: true
  },
  'paymentMethods.$': {
    type: Object
  },
  'paymentMethods.$.name': {
    type: String
  },
  menu: {
    type: Array,
    optional: true
  },
  'menu.$': {
    type: Object
  },
  'menu.$.name': {
    type: String
  },
  rating: {
    type: Number,
    label: 'Categorización',
    regEx: RegExObj.names
  }
}, { check: check, tracker: Tracker });

RestaurantSchema.messageBox.messages(messages);

export { RestaurantSchema, Restaurants };
