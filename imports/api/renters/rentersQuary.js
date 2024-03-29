import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import departments from '../departments/departments';
import { messages, RegExObj } from '../regEx';
import { paymentMethods, money } from '../money/money';
import municipalities from '../municipalities/municipality';

SimpleSchema.extendOptions(['autoform']);

const RentersQuarySchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre',
    optional: true
  },
  email: {
    type: String,
    label: 'Correo',
    optional: true
  },
  website: {
    type: String,
    label: 'Sitio web',
    regEx: RegExObj.website,
    optional: true
  },
  street: {
    type: String,
    label: 'Calle',
    optional: true
  },
  municipality: {
    type: String,
    label: 'Municipio',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => municipalities
    },
    optional: true
  },
  city: {
    type: String,
    label: 'Ciudad',
    regEx: RegExObj.names,
    optional: true
  },
  department: {
    type: String,
    label: 'Departamento',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => departments
    },
    optional: true
  },
  categorization: {
    type: String,
    label: 'Categorización',
    optional: true,
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
  services: {
    optional: true,
    type: Array,
    label: 'Información de Servicios'
  },
  'services.$': {
    type: String,
    label: 'Servicio'
  },
  paymentMethods: {
    optional: true,
    type: Array,
    label: 'Métodos de Pago',
    autoform: {
      optional: true,
      firstOption: '(Seleccione Uno)',
      options: () => paymentMethods
    }
  },
  'paymentMethods.$': {
    type: String,
    label: 'Método de Pago'
  },
  money: {
    optional: true,
    type: Array,
    label: 'Monedas',
    autoform: {
      optional: true,
      firstOption: '(Seleccione Uno)',
      options: () => money
    }
  },
  'money.$': {
    type: String,
    label: 'Moneda'
  }
}, { check: check, tracker: Tracker });

RentersQuarySchema.messageBox.messages(messages);

export default RentersQuarySchema;
