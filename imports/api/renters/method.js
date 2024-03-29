import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';
import { Renters, RentersSchema, renterToExcel } from './renters';
import { FleetRenter, FleetRenterSchema, fleetRenterToExcel } from './fleetRenter';
import { userActivities } from '../userActivities/userActivities';
import { operator, consultant } from '../roles/roles';

Meteor.methods({
  addRenter: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      RentersSchema.validate(doc);
      Renters.insert(doc);
      userActivities.insert({
        userId: Meteor.userId(),
        user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
        role: Meteor.user().roles[0],
        activity: 'agregó',
        collection: 'arrendadoras',
        registerId: 'N/D',
        register: doc.name,
        date: new Date()
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  addRenterBranch: function (doc) {
    RentersSchema.validate(doc);

    const queryP = {
      _id: doc.mainOffice,
      street: doc.street,
      municipality: doc.municipality,
      city: doc.city,
      department: doc.department
    };

    const queryS = {
      street: doc.street,
      municipality: doc.municipality,
      city: doc.city,
      department: doc.department,
      branchOffice: true,
      mainOffice: doc.mainOffice
    };

    const parentCheck = Renters.find(queryP).map(d => d);
    const siblingCheck = Renters.find(queryS).map(d => d);

    if (parentCheck.length > 0 || siblingCheck.length > 0) {
      throw new Meteor.Error('Repeated Branch');
    } else {
      Renters.insert(doc);
      userActivities.insert({
        userId: Meteor.userId(),
        user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
        role: Meteor.user().roles[0],
        activity: 'agregós',
        collection: 'arrendadoras',
        registerId: 'N/D',
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
        user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
        role: Meteor.user().roles[0],
        activity: 'editó',
        collection: 'arrendadoras',
        registerId: _id,
        register: doc.name,
        date: new Date()
      });

      const query = {
        street: data.street,
        municipality: data.municipality,
        city: data.city,
        department: data.department,
        branchOffice: true,
        mainOffice: data.mainOffice
      };

      const repeatedCheck = Renters.find(query).map(d => d);

      if (repeatedCheck.length > 0) {
        throw new Meteor.Error('Repeated Branch');
      } else {
        Renters.update({ _id: _id }, {
          $set: data
        });
      }
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
        user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
        role: Meteor.user().roles[0],
        activity: 'agregó',
        collection: 'Flota de arrendadoras',
        registerId: 'N/D',
        register: doc.name,
        date: new Date()
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  deleteRenter: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      Renters
        .find({ branchOffice: true, mainOffice: id })
        .forEach(doc => {
          Renters.remove({ _id: doc._id });
          FleetRenter.remove({ idRenter: doc._id });
        });
      Renters.remove({ _id: id });
      FleetRenter.remove({ idRenter: id });
      userActivities.insert({
        userId: Meteor.userId(),
        user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
        role: Meteor.user().roles[0],
        activity: 'eliminó',
        collection: 'arrendadoras',
        registerId: 'N/D',
        register: 'N/D',
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
        user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
        role: Meteor.user().roles[0],
        activity: 'eliminó',
        collection: 'Flota de arrendadoras',
        registerId: 'N/D',
        register: 'N/D',
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
        user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
        role: Meteor.user().roles[0],
        activity: 'editó',
        collection: 'Flota de arrendadoras',
        registerId: 'N/D',
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
  },
  reportRenters: function (year) {
    const monthsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Renters.find().fetch().forEach(item => {
      const date = new Date(item.createAt);
      if (date.getFullYear() === year.year) {
        monthsCount[date.getMonth()] += 1;
      }
    });
    return monthsCount;
  },
  exportRentersToExcel: function (query = {}) {
    // workbook
    const wb = XLSX.utils.book_new();
    const data = [];

    Renters.find(query).forEach(doc => {
      const renterRes = renterToExcel(doc._id, doc, false);
      data.push(...renterRes);

      FleetRenter.find({ idRenter: doc._id }).forEach(fleetDoc => {
        const fleetRenterRes = fleetRenterToExcel(fleetDoc._id, fleetDoc, false);
        data.push(...fleetRenterRes);
      });
    });

    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Arrendadoras');

    userActivities.insert({
      userId: Meteor.userId(),
      user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
      role: Meteor.user().roles[0],
      activity: 'exportó',
      collection: 'arrendadoras',
      registerId: 'N/D',
      register: 'N/D',
      date: new Date()
    });

    return wb;
  }
});
