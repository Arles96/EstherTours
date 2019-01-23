import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import { messages } from '../regEx';
import { Attractions } from './attractions';

SimpleSchema.extendOptions(['autoform']);

const RateAttraction = new Mongo.Collection('rateattraction');

const RateAttractionSchema = new SimpleSchema({
  idHotel: {
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
  price: {
    type: Number,
    label: 'Precio',
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
  },
  type: {
    type: String,
    label: 'Tipo de tarifa'
  }
}, { check: check, tracker: Tracker });

RateAttractionSchema.messageBox.messages(messages);

RateAttraction.helpers({
  getHotelName: function () {
    return Attractions.findOne({ _id: this.idHotel }).name;
  }
});

export { RateAttraction, RateAttractionSchema };
