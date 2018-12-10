import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import departments from '../departments/departments';
import { messages, RegExObj } from '../regEx';

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
  street: {
    type: String,
    label: 'Calle',
    optional: true
  },
  municipality: {
    type: String,
    label: 'Municipio',
    regEx: RegExObj.names,
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
    type: Array,
    label: 'Información de Servicios',
    optional: true
  },
  'services.$': {
    type: String,
    label: 'Servicio',
    optional: true
  },
  paymentMethods: {
    type: Array,
    label: 'Métodos de Pago',
    optional: true
  },
  'paymentMethods.$': {
    type: String,
    label: 'Método de Pago'
  },
  money: {
    type: Array,
    label: 'Monedas',
    optional: true
  },
  'money.$': {
    type: String,
    label: 'Moneda'
  }
}, { check: check, tracker: Tracker });

RentersQuarySchema.messageBox.messages(messages);

export default RentersQuarySchema;
