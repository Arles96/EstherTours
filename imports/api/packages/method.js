import { Meteor } from 'meteor/meteor';
import { Packages, PackagesSchema } from './packages';

Meteor.methods({
  insertPackages: function (doc) {
    PackagesSchema.validate(doc);
    Packages.insert(doc);
  }
});
