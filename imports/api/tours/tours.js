import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { RegExObj, messages } from '../regEx';

const Tours = new Mongo.Collection('tours');

SimpleSchema.extendOptions(['autoform']);

const ToursSchema = new SimpleSchema({
  title: {
    type: String,
    label: 'Titulo'
  },
  description: {
    type: String,
    label: 'Descripción'
  },
  price: {
    type: Number,
    label: 'Precio'
  },
  guide: {
    type: String,
    label: 'Guía (Opcional)'
  },
  duration: {
    type: String,
    regEx: RegExObj.isNumber,
    label: 'Duración'
  },
  typeDuraction: {
    type: String,
    label: 'Tipo de Duración'
  },
  numberPersons: {
    type: Number,
    label: 'Cantidad de Personas'
  },
  stree: {
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
    label: 'Departamento'
  },
  images: {
    type: Array,
    label: 'Imagenes (Opcional)'
  },
  'images.$': {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'ToursImages'
      }
    }
  }
}, { check: check, tracker: Tracker });

ToursSchema.messageBox.messages(messages);
Tours.attachSchema(ToursSchema);

export {
  Tours,
  ToursSchema
};
