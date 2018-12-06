import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { messages, RegExObj } from '../regEx';
import department from '../departments/departments';

SimpleSchema.extendOptions(['autoform']);

const licences = [
  {
    optional: true,
    label: 'Licencia o certificación general',
    value: 'Licencia o certificación general'
  },
  {
    optional: true,
    label: 'Licencia local',
    value: 'Licencia local'
  },
  {
    optional: true,
    label: 'Licencia nacional',
    value: 'Licencia nacional'
  },
  {
    optional: true,
    label: 'Licencia regional',
    value: 'Licencia regional'
  }
];

const GuideConsultSchema = new SimpleSchema({
  destination: {
    optional: true,
    type: String,
    label: 'Destino'
  },
  name: {
    optional: true,
    type: String,
    label: 'Nombre'
  },
  email: {
    optional: true,
    type: String,
    label: 'Correo',
    regEx: RegExObj.email
  },
  street: {
    optional: true,
    type: String,
    label: 'Calle'
  },
  city: {
    optional: true,
    type: String,
    label: 'Ciudad',
    regEx: RegExObj.names
  },
  municipality: {
    optional: true,
    type: String,
    label: 'Municipio',
    regEx: RegExObj.names
  },
  department: {
    optional: true,
    type: String,
    label: 'Departamento',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => department
    }
  },
  telephone: {
    optional: true,
    type: String,
    label: 'Teléfono',
    regEx: RegExObj.isNumber,
    min: 8,
    max: 8
  },
  license: {
    optional: true,
    type: String,
    label: 'Licencia',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => licences
    }
  },
  categorization: {
    optional: true,
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
    optional: true,
    type: Array,
    label: 'Información de Servicios'
  },
  'services.$': {
    optional: true,
    type: String,
    label: 'Servicio'
  },
  paymentMethods: {
    optional: true,
    type: Array,
    label: 'Métodos de Pago'
  },
  'paymentMethods.$': {
    optional: true,
    type: String,
    label: 'Método de Pago'
  },
  money: {
    optional: true,
    type: Array,
    label: 'Monedas'
  },
  'money.$': {
    optional: true,
    type: String,
    label: 'Moneda'
  },
  languages: {
    optional: true,
    type: Array,
    label: 'Lenguajes'
  },
  'languages.$': {
    optional: true,
    type: String,
    label: 'Lenguaje'
  },
  creditCards: {
    optional: true,
    type: Array,
    label: 'Tarjetas de Crédito (Opcional)'
  },
  'creditCards.$': {
    optional: true,
    type: String,
    label: 'Tarjeta de crédito'
  }
}, { check: check, tracker: Tracker });

GuideConsultSchema.messageBox.messages(messages);

export default GuideConsultSchema;
