import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import departments from '../departments/departments';
import { messages, RegExObj } from '../regEx';

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
    optional: true,
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

TransportationEstablishmentSchema.messageBox.messages(messages);

export {
  TransportationEstablishments,
  TransportationEstablishmentSchema
};
