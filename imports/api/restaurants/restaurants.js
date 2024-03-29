import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import departments from '../departments/departments';
import { messages, RegExObj } from '../regEx';
import { paymentMethods, money } from '../money/money';
import municipalities from '../municipalities/municipality';
import RestaurantImage from './restaurantImage';

const Restaurants = new Mongo.Collection('restaurants');

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

const RestaurantSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre',
    regEx: RegExObj.lettersAndNumbers
  },
  email: {
    type: String,
    label: 'Correo',
    optional: true,
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
  municipality: {
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
  rating: {
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
    label: 'Métodos de Pago',
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
    label: 'Menajes'
  },
  'menages.$': {
    type: String,
    label: 'Menaje'
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
        collection: 'RestaurantImages'
      }
    }
  },
  ambience: {
    type: Array,
    label: 'Ambiente'
  },
  'ambience.$': {
    type: String
  },
  menu: {
    type: Array,
    label: 'Menu'
  },
  'menu.$': {
    type: String
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
  numbersTables: {
    type: Number,
    label: 'N. de Mesas (Opcional)',
    optional: true,
    regEx: RegExObj.isNumber,
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
  },
  numbersChairs: {
    type: Number,
    optional: true,
    label: 'N. de Sillas (Opcional)',
    regEx: RegExObj.isNumber,
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
  },
  numbersChairsBabies: {
    type: Number,
    optional: true,
    label: 'N. de Sillas para Bebés (Opcional)',
    regEx: RegExObj.isNumber,
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
  },
  maxPersonCapacity: {
    type: Number,
    optional: true,
    label: 'Capacidad Máxima de Personas (Opcional)',
    regEx: RegExObj.isNumber,
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
  },
  facilityPeople: {
    type: Boolean,
    label: 'Facilidades para Discapacitados'
  },
  bar: {
    type: Boolean,
    label: 'Barra'
  },
  waitingRoom: {
    type: Boolean,
    label: 'Sala de Espera'
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
  createAt: {
    type: Date,
    optional: true,
    autoValue: () => new Date()
  }
}, { check: check, tracker: Tracker });

RestaurantSchema.messageBox.messages(messages);
Restaurants.attachSchema(RestaurantSchema);

Restaurants.helpers({
  restaurantImages: function () {
    return this.images.map(_id => RestaurantImage.findOne({ _id }));
  }
});

function restaurantToExcel (id, doc = null, headers = true) {
  let restaurant;

  if (doc) {
    restaurant = doc;
  } else {
    restaurant = Restaurants.findOne({ _id: id });
  }

  const res = [];
  if (restaurant) {
    // headers
    if (headers) {
      res.push(['Restaurante']);
    }
    res.push([
      'Nombre',
      'Sucursal',
      'Departamento',
      'Municipio',
      'Ciudad',
      'Calle',
      'Estrellas',
      'Mesas',
      'Sillas',
      'Sillas para bebes',
      'Capacidad',
      'Facilidades para discapacitados',
      'Barra',
      'Sala de espera',
      'Monedas aceptadas',
      'Telefonos',
      'Servicios',
      'Metodos de pago',
      'Menu',
      'Ambiente',
      'Menajes'
    ]);

    // datos que no son arreglos
    res.push([
      restaurant.name,
      restaurant.branchOffice ? 'Si' : 'No',
      restaurant.department,
      restaurant.municipality,
      restaurant.city,
      restaurant.street,
      restaurant.rating,
      restaurant.numbersTables,
      restaurant.numbersChairs,
      restaurant.numbersChairsBabies,
      restaurant.maxPersonCapacity,
      restaurant.facilityPeople ? 'Si' : 'No',
      restaurant.bar ? 'Si' : 'No',
      restaurant.waitingRoom ? 'Si' : 'No',
      restaurant.money[0] ? restaurant.money[0] : '',
      restaurant.telephone[0] ? restaurant.telephone[0] : '',
      restaurant.services[0] ? restaurant.services[0] : '',
      restaurant.paymentMethods[0] ? restaurant.paymentMethods[0] : '',
      restaurant.menu[0] ? restaurant.menu[0] : '',
      restaurant.ambience[0] ? restaurant.ambience[0] : '',
      restaurant.menages[0] ? restaurant.menages[0] : ''
    ]);

    // datos que son arreglos
    const max = Math.max(...[
      restaurant.money.length,
      restaurant.telephone.length,
      restaurant.services.length,
      restaurant.paymentMethods.length,
      restaurant.menu.length,
      restaurant.ambience.length,
      restaurant.menages.length
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
        '',
        '',
        '',
        '',
        '',
        restaurant.money[i] ? restaurant.money[i] : '',
        restaurant.telephone[i] ? restaurant.telephone[i] : '',
        restaurant.services[i] ? restaurant.services[i] : '',
        restaurant.paymentMethods[i] ? restaurant.paymentMethods[i] : '',
        restaurant.menu[i] ? restaurant.menu[i] : '',
        restaurant.ambience[i] ? restaurant.ambience[i] : '',
        restaurant.menages[i] ? restaurant.menages[i] : ''
      ]);
    }

    res.push([]);
  }
  return res;
}

export {
  RestaurantSchema,
  Restaurants,
  restaurantToExcel
};
