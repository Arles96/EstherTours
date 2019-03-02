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
    label: 'Tipo de Vehículo'
  },
  brands: {
    type: String,
    label: 'Marca de Vehículo'
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
  },
  textRate: function() {
    return this.rate.toFixed(2);
  }
});

function fleetRenterToExcel (id, doc = null, headers = true) {
  let fleet;

  if (doc) {
    fleet = doc;
  } else {
    fleet = FleetRenter.findOne({ _id: id });
  }

  const res = [];
  if (fleet) {
    // headers
    if (headers) {
      res.push(['Flota de Arrendadora']);
    }
    res.push([
      'Tipo de flota',
      'Total',
      'Tipo de Vehículo',
      'Marca',
      'Modelo',
      'Tarifa',
      'Menajes'
    ]);

    // datos que no son arreglos
    res.push([
      fleet.type,
      fleet.total,
      fleet.vehicleTypes,
      fleet.brands,
      fleet.models,
      fleet.rate,
      fleet.menage[0] ? fleet.menage[0] : ''
    ]);

    // datos que son arreglos
    for (let i = 1; i < fleet.menage.length; i += 1) {
      res.push([
        '',
        '',
        '',
        '',
        '',
        '',
        fleet.menage[i] ? fleet.menage[i] : ''
      ]);
    }

    res.push([]);
  }
  return res;
}

export {
  FleetRenter,
  FleetRenterSchema,
  fleetRenterToExcel
};
