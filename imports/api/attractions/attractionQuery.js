import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { messages, RegExObj } from '../regEx';
import departments from '../departments/departments';
import { paymentMethods, money } from '../money/money';

SimpleSchema.extendOptions(['autoform']);

const AttractionQuerySchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre',
    optional: true
  },
  type: {
    type: String,
    label: 'Tipo de atraccion',
    optional: true
  },
  price: {
    type: Number,
    label: 'Costo de visita',
    optional: true
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
  }
}, { check: check, tracker: Tracker });

AttractionQuerySchema.messageBox.messages(messages);

export default AttractionQuerySchema;
