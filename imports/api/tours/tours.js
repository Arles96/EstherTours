import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { RegExObj, messages } from '../regEx';
import departments from '../departments/departments';
import { paymentMethods, money } from '../money/money';
import TourImage from './toursImage';

const Tours = new Mongo.Collection('tours');

SimpleSchema.extendOptions(['autoform']);

const ToursSchema = new SimpleSchema({
  title: {
    type: String,
    label: 'Titulo'
  },
  description: {
    type: String,
    label: 'Descripción',
    autoform: {
      type: 'textarea'
    }
  },
  price: {
    type: Number,
    label: 'Precio'
  },
  guide: {
    type: String,
    label: 'Guía (Opcional)',
    optional: true
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
  duration: {
    type: Number,
    regEx: RegExObj.isNumber,
    label: 'Duración'
  },
  typeDuration: {
    type: String,
    label: 'Tipo de Duración',
    autoform: {
      options: function () {
        return [
          {
            label: 'Meses',
            value: 'Meses'
          },
          {
            label: 'Semanas',
            value: 'Semanas'
          },
          {
            label: 'Días',
            value: 'Días'
          }
        ];
      }
    }
  },
  numberPersons: {
    type: Number,
    label: 'Cantidad de Personas'
  },
  street: {
    type: String,
    label: 'Calle'
  },
  city: {
    type: String,
    label: 'Ciudad'
  },
  municipality: {
    type: String,
    label: 'Municipio'
  },
  department: {
    type: String,
    label: 'Departamento',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => departments
    }
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
        collection: 'ToursImages'
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
  createAt: {
    type: Date,
    optional: true,
    autoValue: () => new Date()
  }
}, { check: check, tracker: Tracker });

ToursSchema.messageBox.messages(messages);

Tours.attachSchema(ToursSchema);

Tours.helpers({
  tourImages: function () {
    return this.images.map(_id => TourImage.findOne({ _id }));
  }
});

export {
  Tours,
  ToursSchema
};
