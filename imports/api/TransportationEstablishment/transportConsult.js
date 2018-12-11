import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import departments from '../departments/departments';
import { messages, RegExObj } from '../regEx';

SimpleSchema.extendOptions(['autoform']);

const TransportConsultSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre',
    regEx: RegExObj.lettersAndNumbers,
    optional: true
  },
  email: {
    type: String,
    label: 'Correo Electrónico',
    regEx: RegExObj.email,
    optional: true
  },
  street: {
    type: String,
    label: 'Calle',
    regEx: RegExObj.lettersAndNumbers,
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
    optional: true
  },
  'paymentMethods.$': {
    type: String,
    regEx: RegExObj.lettersAndNumbers
  },
  money: {
    type: Array,
    label: 'Monedas',
    optional: true
  },
  'money.$': {
    type: String,
    regEx: RegExObj.lettersAndNumbers
  }
}, { check: check, tracker: Tracker });

TransportConsultSchema.messageBox.messages(messages);

export default TransportConsultSchema;
