import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import departments from '../departments/departments';
import { messages, RegExObj } from '../regEx';
import { money, paymentMethods } from '../money/money';

SimpleSchema.extendOptions(['autoform']);

const types = [
  {
    value: 'Terrestre',
    label: 'Terrestre'
  },
  {
    value: 'Aérea',
    label: 'Aérea'
  },
  {
    value: 'Marítima',
    label: 'Marítima'
  }
];

const TransportConsultSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre',
    optional: true
  },
  email: {
    type: String,
    label: 'Correo Electrónico',
    regEx: RegExObj.email,
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
  city: {
    type: String,
    label: 'Ciudad',
    regEx: RegExObj.names,
    optional: true
  },
  town: {
    type: String,
    label: 'Municipio',
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
  type: {
    type: String,
    label: 'Tipo de transporte',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => types
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
  paymentMethods: {
    type: Array,
    label: 'Métodos de Pago',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => paymentMethods
    },
    optional: true
  },
  'paymentMethods.$': {
    type: String
  },
  money: {
    type: Array,
    label: 'Monedas',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => money
    },
    optional: true
  },
  'money.$': {
    type: String
  }
}, { check: check, tracker: Tracker });

TransportConsultSchema.messageBox.messages(messages);

export default TransportConsultSchema;
