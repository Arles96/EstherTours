import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { messages, RegExObj } from '../regEx';
import departments from '../departments/departments';
import { paymentMethods, money } from '../money/money';

SimpleSchema.extendOptions(['autoform']);

const HotelQuerySchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre',
    optional: true
  },
  email: {
    type: String,
    optional: true,
    label: 'Correo (Opcional)'
  },
  street: {
    type: String,
    label: 'Calle',
    optional: true
  },
  city: {
    type: String,
    label: 'Ciudad',
    regEx: RegExObj.names,
    optional: true
  },
  municipality: {
    type: String,
    label: 'Municipio',
    regEx: RegExObj.names,
    optional: true
  },
  departament: {
    type: String,
    label: 'Departamento',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => departments
    },
    optional: true
  },
  phone: {
    type: String,
    label: 'Teléfono',
    regEx: RegExObj.isNumber,
    min: 8,
    max: 8,
    optional: true
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
    },
    optional: true
  },
  contact: {
    type: Array,
    label: 'Contactos',
    optional: true
  },
  'contact.$': {
    type: String,
    label: 'Contactos'
  },
  coin: {
    type: Array,
    label: 'Monedas aceptadas',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => money
    },
    optional: true
  },
  'coin.$': {
    type: String,
    label: 'Moneda',
    optional: true
  },
  services: {
    type: Array,
    label: 'Servicios',
    optional: true
  },
  'services.$': {
    type: String,
    label: 'Servicios',
    optional: true
  },
  paymentsMethod: {
    type: Array,
    label: 'Metodos de pago',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => paymentMethods
    },
    optional: true
  },
  'paymentsMethod.$': {
    type: String,
    label: 'Metodos de pago',
    optional: true
  },
  informationsAB: {
    type: Array,
    label: 'Información A y B',
    optional: true
  },
  'informationsAB.$': {
    type: String,
    label: 'Información A y B',
    optional: true
  },
  activities: {
    type: Array,
    label: 'Actividades',
    optional: true
  },
  'activities.$': {
    type: String,
    label: 'Actividad',
    optional: true
  }
}, { check: check, tracker: Tracker });

HotelQuerySchema.messageBox.messages(messages);

export default HotelQuerySchema;
