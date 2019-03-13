import { Meteor } from 'meteor/meteor';
import { Tours, ToursSchema } from './tours';
import { operator } from '../roles/roles';

Meteor.methods({
  addTours: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      ToursSchema.validate(doc);
      Tours.insert(doc);
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  editTours: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      const data = doc.modifier.$set;
      const { _id } = doc;
      ToursSchema.validate(data);
      Tours.update({ _id }, {
        $set: data
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  removeTour: function (_id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      Tours.remove({ _id });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  }
});
