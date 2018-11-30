import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import { messages } from '../regEx';
import { Hotels } from './hotels';

SimpleSchema.extendOptions(['autoform']);

const RateHotel = new Mongo.Collection('ratehotel');

const RateHotelSchema = new SimpleSchema({
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

RateHotelSchema.messageBox.messages(messages);

RateHotel.helpers({
  getHotelName: function () {
    return Hotels.findOne({ _id: this.idHotel }).name;
  }
});

export { RateHotel, RateHotelSchema };
