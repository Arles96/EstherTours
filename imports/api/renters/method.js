import { Meteor } from 'meteor/meteor';
import { Renters, RentersSchema } from './renters';
import { FleetRenter, FleetRenterSchema } from './fleetRenter';

Meteor.methods({
  addRenter: function (doc) {
    RentersSchema.validate(doc);
    Renters.insert(doc);
  },
  editRenter: function (doc) {
    const data = doc.modifier.$set;
    const { _id } = doc;
    RentersSchema.validate(data);
    Renters.update({ _id: _id }, {
      $set: data
    });
  },
  addFleetRenter: function (doc) {
    FleetRenterSchema.validate(doc);
    FleetRenter.insert(doc);
  }
});
