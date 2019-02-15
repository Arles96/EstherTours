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

const branchContactsSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre',
    optional: true
  },
  role: {
    type: String,
    label: 'Rol',
    optional: true
  }
});

const TransportationEstablishmentSchema = new SimpleSchema({
  idTransportationEstablishment: {
    type: String,
    label: false,
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
  branchOffice: {
    type: Boolean,
    label: false,
    optional: true,
    defaultValue: false,
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
  name: {
    type: String,
    label: 'Nombre'
  },
  email: {
    type: String,
    label: 'Correo Electrónico',
    regEx: RegExObj.email
  },
  website: {
    type: String,
    label: 'Sitio web',
    regEx: RegExObj.website,
    optional: true
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
    label: 'Teléfono',
    custom: function () {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.value.length; i++) {
        // eslint-disable-next-line no-plusplus
        for (let j = i + 1; j < this.value.length; j++) {
          if (this.value[j] === this.value[i]) {
            return 'duplicatePhones';
          }
        }
      }
      return 1;
    }
  },
  'phone.$': {
    type: String,
    label: 'Teléfono',
    regEx: RegExObj.isNumber,
    min: 8,
    max: 8
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
  branchContacts: {
    type: Array,
    label: 'Contactos',
    minCount: 1,
    maxCount: 10,
    optional: true
  },
  'branchContacts.$': {
    type: branchContactsSchema,
    label: ''
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
