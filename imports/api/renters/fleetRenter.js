import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';
import { messages } from '../regEx';

const FleetRenter = new Mongo.Collection('renterFleet');

SimpleSchema.extendOptions(['autoform']);

const FleetRenterSchema = new SimpleSchema({
  idRenter: {
    type: String,
    label: false,
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
  total: {
    type: Number,
    label: 'Total de Flota',
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
  },
  type: {
    type: String,
    label: 'Tipo de Flota'
  },
  rate: {
    type: Number,
    label: 'Tarifa',
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
  },
  menage: {
    type: Array,
    label: 'Menaje de la Flota'
  },
  'menage.$': {
    type: String
  }
}, { check: check, tracker: Tracker });

FleetRenterSchema.messageBox.messages(messages);

export {
  FleetRenter,
  FleetRenterSchema
};
