import { Meteor } from 'meteor/meteor';
import { Renters, RentersSchema } from './renters';
import { FleetRenter, FleetRenterSchema } from './fleetRenter';
import { operator, consultant } from '../roles/roles';

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
  },
  findRenter: function (doc) {
    const query = JSON.parse(JSON.stringify(doc));
    if (Roles.userIsInRole(Meteor.userId(), consultant)) {
      if (query.name) {
        const regStr = query.name.split(/ /).join('|');
        const regex = new RegExp(regStr, 'i');
        query.name = { $regex: regex };
      }
      if (query.email) {
        const regStr = query.email.split(/ /).join('|');
        const regex = new RegExp(regStr, 'i');
        query.email = { $regex: regex };
      }
      if (query.website) {
        const regStr = query.website.split(/ /).join('|');
        const regex = new RegExp(regStr, 'i');
        query.website = { $regex: regex };
      }
      if (query.street) {
        const regStr = query.street.split(/ /).join('|');
        const regex = new RegExp(regStr, 'i');
        query.street = { $regex: regex };
      }
      if (query.city) {
        const regStr = query.city.split(/ /).join('|');
        const regex = new RegExp(regStr, 'i');
        query.city = { $regex: regex };
      }
      if (query.municipality) {
        const regStr = query.municipality.split(/ /).join('|');
        const regex = new RegExp(regStr, 'i');
        query.municipality = { $regex: regex };
      }
      if (query.services) {
        query.services = { $in: query.query };
      }
      if (query.paymentMethods) {
        query.paymentMethods = { $in: query.query };
      }
      if (query.money) {
        query.money = { $in: query.query };
      }

      return { doc, query };
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  }
});
