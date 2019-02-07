import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';
import { messages, RegExObj } from '../regEx';
import { Renters } from './renters';
// import vehicleTypes from '../vehicleTypes/vehicleTypes';
// import models from '../models/models';
// import brands from '../brands/brands';

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
  /* model: {
    type: String,
    label: 'Modelo de Vehículo',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => vehicleType
    }
  },
  brand: {
    type: String,
    label: 'Marca de Vehículo',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => model
    }
  }, */
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

FleetRenter.helpers({
  getRenterName: function () {
    return Renters.findOne({ _id: this.idRenter }).name;
  }
});

export {
  FleetRenter,
  FleetRenterSchema
};
