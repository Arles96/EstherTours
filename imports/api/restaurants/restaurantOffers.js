import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';
import { messages, RegExObj } from '../regEx';
import { Restaurants } from './restaurants';

const restaurantOffers = new Mongo.Collection('restaurantOffers');

SimpleSchema.extendOptions(['autoform']);

const restaurantOffersSchema = new SimpleSchema({
  idRestaurant: {
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
  typeFood: {
    type: String,
    label: 'Tipo de Comida'
  },
  price: {
    type: Number,
    label: 'Precio',
    custom: function () {
      if (!RegExObj.isNumber.test(this.value)) {
        return 'onlyNumber';
      }
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
  },
  dishName: {
    type: String,
    label: 'Nombre del Plato',
    regEx: RegExObj.names
  }
}, { check: check, tracker: Tracker });

restaurantOffersSchema.messageBox.messages(messages);

restaurantOffers.helpers({
  getRenterName: function () {
    return Restaurants.findOne({ _id: this.idRenter }).name;
  }
});

export {
  restaurantOffers,
  restaurantOffersSchema
};
