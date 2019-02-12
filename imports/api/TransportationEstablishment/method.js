import { Meteor } from 'meteor/meteor';
import { TransportationEstablishments, TransportationEstablishmentSchema } from './TransportationEstablishment';
import { FleetTransportationEstablishment, FleetTransportationEstablishmentSchema } from './FleetTransportationEstablishment';
import { RouteTransportationEstablishment, RouteTransportationEstablishmentSchema } from './RouteTransportationEstablishment';
import { operator } from '../roles/roles';
import TransportConsultSchema from './transportConsult';

Meteor.methods({
  addTransportationEstablishment: function (doc) {
    TransportationEstablishmentSchema.validate(doc);
    TransportationEstablishments.insert(doc);
  },
  findTransport: function (doc) {
    TransportConsultSchema.validate(doc);
    const query = JSON.parse(JSON.stringify(doc));
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
    if (query.town) {
      const regStr = query.town.split(/ /).join('|');
      const regex = new RegExp(regStr, 'i');
      query.town = { $regex: regex };
    }
    if (query.type) {
      const regStr = query.type.split(/ /).join('|');
      const regex = new RegExp(regStr, 'i');
      query.type = { $regex: regex };
    }
    if (query.paymentMethods) {
      query.paymentMethods = { $in: query.paymentMethods };
    }
    if (query.money) {
      query.money = { $in: query.money };
    }
    return { doc, query };
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
  },
  addRouteTransportationEstablishment: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      RouteTransportationEstablishmentSchema.validate(doc);
      RouteTransportationEstablishment.insert(doc);
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  deleteRouteTransportationEstablishment: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      RouteTransportationEstablishment.remove({ _id: id });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  editRouteTransportationEstablishment: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      const data = doc.modifier.$set;
      const { _id } = doc;
      RouteTransportationEstablishmentSchema.validate(data);
      RouteTransportationEstablishment.update({ _id: _id }, {
        $set: data
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  addBranchOfficeTransportationEstablishment: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      TransportationEstablishmentSchema.validate(doc);
      TransportationEstablishments.insert(doc);
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  deleteBranchOfficeTransportationEstablishment: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      TransportationEstablishments.remove({ _id: id });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  editBranchOfficeTransportationEstablishment: function (doc) {
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
  }
});
