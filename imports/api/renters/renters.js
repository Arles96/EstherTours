import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import departments from '../departments/departments';
import { messages, RegExObj } from '../regEx';

const Renters = new Mongo.Collection('renters');

SimpleSchema.extendOptions(['autoform']);

const RentersSchema = new SimpleSchema({
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
    type: String,
    regEx: RegExObj.lettersAndNumbers
  },
  paymentMethods: {
    type: Array,
    label: 'Métodos de Pago'
  },
  'paymentMethods.$': {
    type: String,
    regEx: RegExObj.lettersAndNumbers
  },
  money: {
    type: Array,
    label: 'Monedas'
  },
  'money.$': {
    type: String,
    regEx: RegExObj.lettersAndNumbers
  }
}, { check: check, tracker: Tracker });

RentersSchema.messageBox.messages(messages);

export {
  Renters,
  RentersSchema
};
