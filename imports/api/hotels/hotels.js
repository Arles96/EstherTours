import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import { messages, RegExObj } from '../regEx';
import departments from '../departments/departments';
import { paymentMethods, money } from '../money/money';

SimpleSchema.extendOptions(['autoform']);

const branchOfficeSchema = new SimpleSchema({
  departament: {
    type: String,
    label: 'Departamento'
  },
  municipality: {
    type: String,
    label: 'Municipio'
  }
});

const Hotels = new Mongo.Collection('hotels');

const HotelSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre'
  },
  email: {
    type: String,
    optional: true,
    label: 'Correo (Opcional)'
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
    regEx: RegExObj.names
  },
  departament: {
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
    regEx: RegExObj.isNumber,
    min: 8,
    max: 8
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
  services: {
    type: Array,
    label: 'Servicios'
  },
  'services.$': {
    type: String,
    label: 'Servicios'
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
  },
  informationsAB: {
    type: Array,
    label: 'Información A y B'
  },
  'informationsAB.$': {
    type: String,
    label: 'Información A y B'
  },
  activities: {
    type: Array,
    label: 'Actividades'
  },
  'activities.$': {
    type: String,
    label: 'Actividad'
  },
  branchOffices: {
    type: Array,
    label: 'Sucursales',
    minCount: 1,
    maxCount: 10
  },
  'branchOffices.$': {
    type: branchOfficeSchema,
    label: 'Sucursal'
  }
}, { check: check, tracker: Tracker });

HotelSchema.messageBox.messages(messages);

Hotels.attachSchema(HotelSchema);

export { HotelSchema, Hotels };
