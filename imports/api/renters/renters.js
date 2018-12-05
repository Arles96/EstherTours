import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import departments from '../departments/departments';
import { messages, RegExObj } from '../regEx';
// import municipalities from '../municipalities/municipality';

const Renters = new Mongo.Collection('renters');

SimpleSchema.extendOptions(['autoform']);

const RentersSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre'
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
  categorization: {
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
    type: String,
    label: 'Teléfono',
    regEx: RegExObj.isNumber,
    min: 8,
    max: 8
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
    label: 'Método de Pago'
  },
  money: {
    type: Array,
    label: 'Monedas'
  },
  'money.$': {
    type: String,
    label: 'Moneda'
  }
}, { check: check, tracker: Tracker });

RentersSchema.messageBox.messages(messages);

Renters.attachSchema(RentersSchema);

export {
  Renters,
  RentersSchema
};
