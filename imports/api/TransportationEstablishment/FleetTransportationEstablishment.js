import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';
import { messages, RegExObj } from '../regEx';
import { TransportationEstablishments } from './TransportationEstablishment';

const FleetTransportationEstablishment = new Mongo.Collection('FleetTransportationEstablishment');

SimpleSchema.extendOptions(['autoform']);

const FleetTransportationEstablishmentSchema = new SimpleSchema({
  idTransportationEstablishment: {
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
  capacity: {
    type: Number,
    label: 'Capacidad de Flota',
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    },
    regEx: RegExObj.isNumber
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
    },
    regEx: RegExObj.isNumber
  }
}, { check: check, tracker: Tracker });

FleetTransportationEstablishmentSchema.messageBox.messages(messages);

FleetTransportationEstablishment.helpers({
  getTransportationEstablishmentName: function () {
    return TransportationEstablishments.findOne({ _id: this.idTransportationEstablishment }).name;
  }
});

FleetTransportationEstablishment.attachSchema(FleetTransportationEstablishmentSchema);

export {
  FleetTransportationEstablishment,
  FleetTransportationEstablishmentSchema
};
