import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import { messages, RegExObj } from '../regEx';
import departments from '../departments/departments';
import { paymentMethods, money } from '../money/money';

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
  branchOffice: {
    type: Boolean,
    label: 'Es sucursal',
    defaultValue: false
  },
  mainOffice: {
    type: String,
    label: 'Oficina principal',
    custom: function () {
      if (!this.value && this.field('branchOffice').value) {
        return 'required';
      } else {
        return 1;
      }
    },
    optional: true
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
  },
  createAt: {
    type: Date,
    optional: true,
    autoValue: () => new Date()
  }
}, { check: check, tracker: Tracker });

HotelSchema.messageBox.messages(messages);

Hotels.attachSchema(HotelSchema);

function hotelsToExcel (id, doc = null, headers = true) {
  let hotel;

  if (doc) {
    hotel = doc;
  } else {
    hotel = Hotels.findOne({ _id: id });
  }

  const res = [];
  if (hotel) {
    // headers
    if (headers) {
      res.push(['Hotel']);
    }
    res.push([
      'Nombre',
      'Sucursal',
      'Correo',
      'Sitio web',
      'Estrellas',
      'Departamento',
      'Municipio',
      'Ciudad',
      'Calle',
      'Monedas aceptadas',
      'Telefonos',
      'Servicios',
      'Metodos de pago',
      'Informacion A y B',
      'Activicades'
    ]);

    // datos que no son arreglos
    res.push([
      hotel.name,
      hotel.branchOffice ? 'Si' : 'No',
      hotel.email,
      hotel.website,
      hotel.categorization,
      hotel.departament,
      hotel.municipality,
      hotel.city,
      hotel.street,
      hotel.coin[0] ? hotel.coin[0] : '',
      hotel.phone[0] ? hotel.phone[0] : '',
      hotel.services[0] ? hotel.services[0] : '',
      hotel.paymentsMethod[0] ? hotel.paymentsMethod[0] : '',
      hotel.informationsAB[0] ? hotel.informationsAB[0] : '',
      hotel.activities[0] ? hotel.activities[0] : ''
    ]);

    // datos que son arreglos
    const max = Math.max(...[
      hotel.coin.length,
      hotel.phone.length,
      hotel.services.length,
      hotel.paymentsMethod.length,
      hotel.informationsAB.length,
      hotel.activities.length
    ]);

    for (let i = 1; i < max; i += 1) {
      res.push([
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        hotel.coin[i] ? hotel.coin[i] : '',
        hotel.phone[i] ? hotel.phone[i] : '',
        hotel.services[i] ? hotel.services[i] : '',
        hotel.paymentsMethod[i] ? hotel.paymentsMethod[i] : '',
        hotel.informationsAB[i] ? hotel.informationsAB[i] : '',
        hotel.activities[i] ? hotel.activities[i] : ''
      ]);
    }

    res.push([]);
  }
  return res;
}

export { HotelSchema, Hotels, hotelsToExcel };
