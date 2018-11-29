import { Meteor } from 'meteor/meteor';
import { HotelSchema, Hotels } from './hotels';

Meteor.methods({
  insertHotel: function (doc) {
    HotelSchema.validate(doc);
    Hotels.insert(doc);
  }
});
