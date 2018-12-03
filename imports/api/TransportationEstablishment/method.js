import { Meteor } from 'meteor/meteor';
import { TransportationEstablishments, TransportationEstablishmentSchema } from './TransportationEstablishment';
import { FleetTransportationEstablishment, FleetTransportationEstablishmentSchema } from './FleetTransportationEstablishment';
import { operator } from '../roles/roles';

Meteor.methods({
  addTransportationEstablishment: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      TransportationEstablishmentSchema.validate(doc);
      TransportationEstablishments.insert(doc);
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  editTransportationEstablishment: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      const data = doc.modifier.$set;
      const { _id } = doc;
      TransportationEstablishmentSchema.validate(data);
      TransportationEstablishments.update({ _id: _id }, {
        $set: data
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  addFleetTransportationEstablishment: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      FleetTransportationEstablishmentSchema.validate(doc);
      FleetTransportationEstablishment.insert(doc);
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  deleteTransportationEstablishment: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      TransportationEstablishments.remove({ _id: id });
      FleetTransportationEstablishment.remove({ idTransportationEstablishment: id });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  deleteFleetTransportationEstablishment: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      FleetTransportationEstablishment.remove({ _id: id });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  editFleetTransportationEstablishment: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      const data = doc.modifier.$set;
      const { _id } = doc;
      FleetTransportationEstablishmentSchema.validate(data);
      FleetTransportationEstablishment.update({ _id: _id }, {
        $set: data
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  }
});
