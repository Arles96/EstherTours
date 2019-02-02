import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import { messages, RegExObj } from '../regEx';
import departments from '../departments/departments';
import { paymentMethods, money } from '../money/money';
import HotelImage from './hotelImage';

SimpleSchema.extendOptions(['autoform']);

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
  images: {
    type: Array,
    label: 'Imagenes (Opcional)',
    optional: true
  },
  'images.$': {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'HotelImages'
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
    label: '',
    optional: true
  }
}, { check: check, tracker: Tracker });

HotelSchema.messageBox.messages(messages);

Hotels.attachSchema(HotelSchema);

Hotels.helpers({
  hotelImages: function () {
    return this.images.map(_id => HotelImage.findOne({ _id }));
  }
});

export { HotelSchema, Hotels };
