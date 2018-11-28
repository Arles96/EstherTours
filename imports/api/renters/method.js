import { Meteor } from 'meteor/meteor';
import { Renters, RentersSchema } from './renters';
import { FleetRenter, FleetRenterSchema } from './fleetRenter';
import { operator } from '../roles/roles';

Meteor.methods({
  addRenter: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      RentersSchema.validate(doc);
      Renters.insert(doc);
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  editRenter: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      const data = doc.modifier.$set;
      const { _id } = doc;
      RentersSchema.validate(data);
      Renters.update({ _id: _id }, {
        $set: data
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  addFleetRenter: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      FleetRenterSchema.validate(doc);
      FleetRenter.insert(doc);
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  deleteRenter: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      Renters.remove({ _id: id });
      FleetRenter.remove({ idRenter: id });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  deleteFleetRenter: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      FleetRenter.remove({ _id: id });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  editFleetRenter: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      const data = doc.modifier.$set;
      const { _id } = doc;
      FleetRenterSchema.validate(data);
      FleetRenter.update({ _id: _id }, {
        $set: data
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  }
});
