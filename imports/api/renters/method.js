import { Meteor } from 'meteor/meteor';
import { Renters, RentersSchema } from './renters';

Meteor.methods({
  addRenter: function (doc) {
    RentersSchema.validate(doc);
    Renters.insert(doc);
  }
});
