import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import { messages, RegExObj } from '../regEx';
import departments from '../departments/departments';
import { paymentMethods, money } from '../money/money';
import municipalities from '../municipalities/municipality';
import types from './types';

SimpleSchema.extendOptions(['autoform']);

const Attractions = new Mongo.Collection('attractions');

const AttractionSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre'
  },
  type: {
    type: Array,
    label: 'Tipo de atraccion',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => types
    }
  },
  'type.$': {
    type: String,
    label: 'Tipo de atraccion'
  },
  price: {
    type: Number,
    label: 'Costo de visita',
    regEx: RegExObj.isNumber,
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
  },
  guide: {
    type: String,
    label: 'Guia',
    autoform: {
      firstOption: '(Seleccione Uno)'
    }
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
  municipality: {
    type: String,
    label: 'Municipio',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => municipalities
    }
  },
  departament: {
    type: String,
    label: 'Departamento',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => departments
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
  telephone: {
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
  'telephone.$': {
    type: String,
    label: 'Teléfono',
    regEx: RegExObj.isNumber,
    min: 8,
    max: 8
  },
  coin: {
    type: Array,
    label: 'Monedas aceptadas',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => money
    }
  },
  'coin.$': {
    type: String,
    label: 'Moneda'
  },
  paymentsMethod: {
    type: Array,
    label: 'Metodos de pago',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => paymentMethods
    }
  },
  'paymentsMethod.$': {
    type: String,
    label: 'Metodos de pago'
  }
}, { check: check, tracker: Tracker });

AttractionSchema.messageBox.messages(messages);

Attractions.attachSchema(AttractionSchema);

export { AttractionSchema, Attractions };
