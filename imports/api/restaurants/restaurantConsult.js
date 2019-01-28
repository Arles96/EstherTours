import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import departments from '../departments/departments';
import { messages, RegExObj } from '../regEx';
import { paymentMethods, money } from '../money/money';
import municipalities from '../municipalities/municipality';

SimpleSchema.extendOptions(['autoform']);

const RestaurantConsultSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre',
    regEx: RegExObj.lettersAndNumbers,
    optional: true
  },
  email: {
    type: String,
    label: 'Correo',
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
  municipality: {
    optional: true,
    type: String,
    label: 'Municipio',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => municipalities
    }
  },
  city: {
    type: String,
    label: 'Ciudad',
    regEx: RegExObj.names,
    optional: true
  },
  department: {
    type: String,
    label: 'Departamento',
    optional: true,
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => departments
    }
  },
  rating: {
    type: String,
    label: 'Categorización',
    optional: true,
    autoform: {
      readonly: true,
      omit: true,
      optional: true,
      afFieldInput: {
        type: 'hidden'
      },
      afFormGroup: {
        label: false
      }
    }
  },
  telephone: {
    type: String,
    label: 'Teléfono',
    regEx: RegExObj.isNumber,
    min: 8,
    max: 8,
    optional: true
  },
  services: {
    type: Array,
    label: 'Información de Servicios',
    optional: true
  },
  'services.$': {
    type: String,
    label: 'Servicio'
  },
  paymentMethods: {
    optional: true,
    type: Array,
    label: 'Formas de Pago',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => paymentMethods
    }
  },
  'paymentMethods.$': {
    type: String,
    label: 'Formas de Pago'
  },
  money: {
    optional: true,
    type: Array,
    label: 'Monedas',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => money
    }
  },
  'money.$': {
    type: String,
    label: 'Moneda'
  },
  menages: {
    type: Array,
    label: 'Menajes',
    optional: true
  },
  'menages.$': {
    type: String,
    label: 'Menaje'
  },
  ambience: {
    type: Array,
    label: 'Ambiente',
    optional: true
  },
  'ambience.$': {
    type: String
  },
  menu: {
    type: Array,
    label: 'Menu',
    optional: true
  },
  'menu.$': {
    type: String
  },
  numbersTables: {
    type: Number,
    label: 'N. de Mesas',
    regEx: RegExObj.isNumber,
    optional: true,
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
  },
  numbersChairs: {
    type: Number,
    label: 'N. de Sillas',
    regEx: RegExObj.isNumber,
    optional: true,
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
  },
  numbersChairsBabies: {
    type: Number,
    label: 'N. de Sillas para Bebés',
    regEx: RegExObj.isNumber,
    optional: true,
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
  },
  maxPersonCapacity: {
    type: Number,
    label: 'Capacidad Máxima de Personas',
    regEx: RegExObj.isNumber,
    optional: true,
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
  },
  facilityPeople: {
    type: Boolean,
    label: 'Facilidad de Acceso',
    optional: true,
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => [
        { value: true, label: 'Si' },
        { value: false, label: 'No' }
      ]
    }
  },
  bar: {
    type: Boolean,
    label: 'Barra',
    optional: true,
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => [
        { value: true, label: 'Si' },
        { value: false, label: 'No' }
      ]
    }
  },
  waitingRoom: {
    type: Boolean,
    label: 'Sala de Espera',
    optional: true,
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => [
        { value: true, label: 'Si' },
        { value: false, label: 'No' }
      ]
    }
  }

}, { check: check, tracker: Tracker });

RestaurantConsultSchema.messageBox.messages(messages);

export default RestaurantConsultSchema;
