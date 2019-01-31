import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import departments from '../departments/departments';
import { messages, RegExObj } from '../regEx';
import { money, paymentMethods } from '../money/money';

const TransportationEstablishments = new Mongo.Collection('TransportationEstablishments');

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

const TransportationEstablishmentSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre'
  },
  email: {
    type: String,
    label: 'Correo Electrónico',
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
  town: {
    type: String,
    label: 'Municipio',
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
  phone: {
    type: Array,
    label: 'Teléfonos'
  },
  'phone.$': {
    type: Number,
    label: 'Teléfono',
    regEx: RegExObj.isNumber,
    min: 10000000,
    max: 99999999
  },
  type: {
    type: String,
    label: 'Tipo de transporte',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => types
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
  paymentMethods: {
    type: Array,
    label: 'Métodos de Pago',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => paymentMethods
    }
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
    }
  },
  'money.$': {
    type: String
  }
}, { check: check, tracker: Tracker });

TransportationEstablishmentSchema.messageBox.messages(messages);

TransportationEstablishments.attachSchema(TransportationEstablishmentSchema);

export {
  TransportationEstablishments,
  TransportationEstablishmentSchema
};
