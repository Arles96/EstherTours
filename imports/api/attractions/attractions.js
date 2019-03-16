import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import { messages, RegExObj } from '../regEx';
import departments from '../departments/departments';
import { paymentMethods, money } from '../money/money';
import municipalities from '../municipalities/municipality';
import types from './types';
import AttractionImages from './attractionImage';

SimpleSchema.extendOptions(['autoform']);

const Attractions = new Mongo.Collection('attractions');

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
        collection: 'AttractionImages'
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
  },
  createAt: {
    type: Date,
    optional: true,
    autoValue: () => new Date()
  }
}, { check: check, tracker: Tracker });

AttractionSchema.messageBox.messages(messages);

Attractions.helpers({
  attractionImages: function () {
    return this.images.map(_id => AttractionImages.findOne({ _id }));
  },
  textPrice: function () {
    return this.price.toFixed(2);
  }
});

Attractions.attachSchema(AttractionSchema);

function attractionToExcel (id, doc = null, headers = true) {
  let attraction;

  if (doc) {
    attraction = doc;
  } else {
    attraction = Attractions.findOne({ _id: id });
  }

  const res = [];
  if (attraction) {
    // headers
    if (headers) {
      res.push(['Atraccion']);
    }
    res.push([
      'Nombre',
      'Costo',
      'Estrellas',
      'Departamento',
      'Municipio',
      'Ciudad',
      'Calle',
      'Tipo',
      'Monedas aceptadas',
      'Telefonos',
      'Metodos de pago'
    ]);

    // datos que no son arreglos
    res.push([
      attraction.name,
      attraction.price,
      attraction.categorization,
      attraction.departament,
      attraction.municipality,
      attraction.city,
      attraction.street,
      attraction.type[0] ? attraction.type[0] : '',
      attraction.coin[0] ? attraction.coin[0] : '',
      attraction.telephone[0] ? attraction.telephone[0] : '',
      attraction.paymentsMethod[0] ? attraction.paymentsMethod[0] : ''
    ]);

    // datos que son arreglos
    const max = Math.max(...[
      attraction.type.length,
      attraction.coin.length,
      attraction.telephone.length,
      attraction.paymentsMethod.length
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
        attraction.type[i] ? attraction.type[i] : '',
        attraction.coin[i] ? attraction.coin[i] : '',
        attraction.telephone[i] ? attraction.telephone[i] : '',
        attraction.paymentsMethod[i] ? attraction.paymentsMethod[i] : ''
      ]);
    }

    res.push([]);
  }
  return res;
}

export { AttractionSchema, Attractions, attractionToExcel };
