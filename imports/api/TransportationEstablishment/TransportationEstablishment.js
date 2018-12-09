import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import departments from '../departments/departments';
import { messages, RegExObj } from '../regEx';
import { money, paymentMethods } from '../money/money';

const TransportationEstablishments = new Mongo.Collection('TransportationEstablishments');

SimpleSchema.extendOptions(['autoform']);

const TransportationEstablishmentSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre',
    regEx: RegExObj.lettersAndNumbers
  },
  email: {
    type: String,
    label: 'Correo Electrónico',
    regEx: RegExObj.email
  },
  street: {
    type: String,
    label: 'Calle',
    regEx: RegExObj.lettersAndNumbers
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
    type: String,
    label: 'Teléfono',
    regEx: RegExObj.isNumber
  },
  type: {
    type: String,
    label: 'Tipo de transporte'
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
    max: paymentMethods.length
  },
  'paymentMethods.$': {
    type: String,
    regEx: RegExObj.lettersAndNumbers,
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => paymentMethods
    }
  },
  money: {
    type: Array,
    label: 'Monedas'
  },
  'money.$': {
    type: String,
    regEx: RegExObj.lettersAndNumbers,
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => money
    }
  }
}, { check: check, tracker: Tracker });

TransportationEstablishmentSchema.messageBox.messages(messages);

export {
  TransportationEstablishments,
  TransportationEstablishmentSchema
};
