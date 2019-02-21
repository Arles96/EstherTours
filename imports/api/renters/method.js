import { Meteor } from 'meteor/meteor';
import { Renters, RentersSchema } from './renters';
import { FleetRenter, FleetRenterSchema } from './fleetRenter';
import { operator, consultant } from '../roles/roles';
import userActivities from '../userActivities/userActivities';

Meteor.methods({
  addRenter: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      RentersSchema.validate(doc);
      Renters.insert(doc);
      userActivities.insert({
        userId: Meteor.userId(),
        user: Meteor.user().profile.firstName,
        activity: 'agregó',
        collection: 'renters',
        registerId: '',
        register: doc.name,
        date: new Date()
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  addRenterBranch: function (doc) {
    RentersSchema.validate(doc);

    const query = {
      street: doc.street,
      municipality: doc.municipality,
      city: doc.city,
      department: doc.department
    };

    if (Renters.find(query).map(d => d).length > 0) {
      throw new Meteor.Error('Repeated Branch');
    } else {
      Renters.insert(doc);
      userActivities.insert({
        userId: Meteor.userId(),
        user: Meteor.user().profile.firstName,
        activity: 'agregós',
        collection: 'renters',
        registerId: '',
        register: doc.name,
        date: new Date()
      });
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

      userActivities.insert({
        userId: Meteor.userId(),
        user: Meteor.user().profile.firstName,
        activity: 'editó',
        collection: 'renters',
        registerId: _id,
        register: doc.name,
        date: new Date()
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  addFleetRenter: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      FleetRenterSchema.validate(doc);
      FleetRenter.insert(doc);
      userActivities.insert({
        userId: Meteor.userId(),
        user: Meteor.user().profile.firstName,
        activity: 'agregó',
        collection: 'renterFleet',
        registerId: '',
        register: doc.name,
        date: new Date()
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  deleteRenter: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      Renters.remove({ _id: id });
      FleetRenter.remove({ idRenter: id });
      userActivities.insert({
        userId: Meteor.userId(),
        user: Meteor.user().profile.firstName,
        activity: 'eliminó',
        collection: 'renters',
        registerId: '',
        register: '',
        date: new Date()
      });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  deleteFleetRenter: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      FleetRenter.remove({ _id: id });
      userActivities.insert({
        userId: Meteor.userId(),
        user: Meteor.user().profile.firstName,
        activity: 'eliminó',
        collection: 'renterFleet',
        registerId: '',
        register: '',
        date: new Date()
      });
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
      userActivities.insert({
        userId: Meteor.userId(),
        user: Meteor.user().profile.firstName,
        activity: 'editó',
        collection: 'renterFleet',
        registerId: '',
        register: doc.name,
        date: new Date()
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
