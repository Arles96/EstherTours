import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';
import { messages, RegExObj } from '../regEx';
import { Renters } from './renters';

const FleetRenter = new Mongo.Collection('renterFleet');

SimpleSchema.extendOptions(['autoform']);

const types = [
  {
    value: 'Terrestre',
    label: 'Terrestre'
  },
  {
    value: 'Aérea',
    label: 'Aérea'
  },
  {
    value: 'Marítima',
    label: 'Marítima'
  }
];

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
    label: 'Tipo de Flota',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => types
    }
  },
  vehicleTypes: {
    type: String,
    label: 'Tipo de Vehículo',
    regEx: RegExObj.names
  },
  brands: {
    type: String,
    label: 'Marca de Vehículo',
    regEx: RegExObj.names
  },
  models: {
    type: String,
    label: 'Modelo de Vehículo'
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
  },
  images: {
    type: Array,
    label: 'Imágenes (Opcional)',
    optional: true
  },
  'images.$': {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'fleetRenterImage'
      }
    }
  }
}, { check: check, tracker: Tracker });

FleetRenterSchema.messageBox.messages(messages);

FleetRenter.helpers({
  getRenterName: function () {
    return Renters.findOne({ _id: this.idRenter }).name;
  }
});

export {
  FleetRenter,
  FleetRenterSchema
};
