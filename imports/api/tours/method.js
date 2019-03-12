import { Meteor } from 'meteor/meteor';
import { Tours, ToursSchema } from './tours';

Meteor.methods({
  addTours: function (doc) {
    ToursSchema.validate(doc);
    Tours.insert(doc);
  }
});
