import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import { messages, RegExObj } from '../regEx';
import department from '../departments/departments';

const Guide = new Mongo.Collection('guide');

SimpleSchema.extendOptions(['autoform']);

const licences = [
  {
    label: 'Licencia o certificación general',
    value: 'Licencia o certificación general'
  },
  {
    label: 'Licencia local',
    value: 'Licencia local'
  },
  {
    label: 'Licencia nacional',
    value: 'Licencia nacional'
  },
  {
    label: 'Licencia regional',
    value: 'Licencia regional'
  }
];

const GuideSchema = new SimpleSchema({
  destination: {
    type: String,
    label: 'Destino'
  },
  name: {
    type: String,
    label: 'Nombre'
  },
  email: {
    type: String,
    label: 'Correo',
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
  municipality: {
    type: String,
    label: 'Municipio',
    regEx: RegExObj.names
  },
  department: {
    type: String,
    label: 'Departamento',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => department
    }
  },
  telephone: {
    type: String,
    label: 'Teléfono',
    regEx: RegExObj.isNumber,
    min: 8,
    max: 8
  },
  license: {
    type: String,
    label: 'Licencia',
    autoform: {
      options: () => licences
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
  services: {
    type: Array,
    label: 'Información de Servicios'
  },
  'services.$': {
    type: String,
    label: 'Servicio'
  },
  paymentMethods: {
    type: Array,
    label: 'Métodos de Pago'
  },
  'paymentMethods.$': {
    type: String,
    label: 'Método de Pago'
  },
  money: {
    type: Array,
    label: 'Monedas'
  },
  'money.$': {
    type: String,
    label: 'Moneda'
  },
  languages: {
    type: Array,
    label: 'Lenguajes'
  },
  'languages.$': {
    type: String,
    label: 'Lenguaje'
  },
  creditCards: {
    type: Array,
    optional: true,
    label: 'Tarjetas de Crédito (Opcional)'
  },
  'creditCards.$': {
    type: String,
    label: 'Tarjeta de crédito'
  }
}, { check: check, tracker: Tracker });

GuideSchema.messageBox.messages(messages);

export {
  Guide,
  GuideSchema
};