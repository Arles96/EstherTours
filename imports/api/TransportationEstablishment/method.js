import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';
import { TransportationEstablishments, TransportationEstablishmentSchema, transportToExcel } from './TransportationEstablishment';
import { FleetTransportationEstablishment, FleetTransportationEstablishmentSchema } from './FleetTransportationEstablishment';
import { RouteTransportationEstablishment, RouteTransportationEstablishmentSchema, routeTransportToExcel } from './RouteTransportationEstablishment';
import { operator, consultant, admin } from '../roles/roles';
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
      const validate = TransportationEstablishments.find({
        $or: [{
          idTransportationEstablishment: data.idTransportationEstablishment,
          street: data.street,
          city: data.city,
          department: data.department,
          town: data.town
        }, {
          _id: data.idTransportationEstablishment,
          street: data.street,
          city: data.city,
          department: data.department,
          town: data.town
        }, {
          _id: _id,
          street: data.street,
          city: data.city,
          department: data.department,
          town: data.town
        }, {
          idTransportationEstablishment: _id,
          street: data.street,
          city: data.city,
          department: data.department,
          town: data.town
        }]
      }).fetch();
      if (validate.length > 0) {
        validate.forEach(value => {
          if (value._id !== doc._id) {
            throw new Meteor.Error('Ubicación duplicada.');
          }
        });
      }
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
      const validate = TransportationEstablishments.findOne({
        $or: [{
          idTransportationEstablishment: doc.idTransportationEstablishment,
          street: doc.street,
          city: doc.city,
          department: doc.department,
          town: doc.town
        }, {
          _id: doc.idTransportationEstablishment,
          street: doc.street,
          city: doc.city,
          department: doc.department,
          town: doc.town
        }]
      });
      if (validate) {
        throw new Meteor.Error('Ubicación duplicada.');
      }
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
  },
  reportTransportationEstablishment: function (year) {
    if (Roles.userIsInRole(Meteor.userId(), operator) ||
      Roles.userIsInRole(Meteor.userId(), consultant) ||
      Roles.userIsInRole(Meteor.userId(), admin)
    ) {
      const monthsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      TransportationEstablishments.find().fetch().forEach(item => {
        const date = new Date(item.createAt);
        if (date.getFullYear() === year.year) {
          monthsCount[date.getMonth()] += 1;
        }
      });
      return monthsCount;
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  exportTransportsToExcel: function () {
    // workbook
    const wb = XLSX.utils.book_new();
    const data = [];

    TransportationEstablishments.find({}).forEach(doc => {
      const transportRes = transportToExcel(doc._id, doc, false);
      data.push(...transportRes);

      RouteTransportationEstablishment
        .find({ idTransportationEstablishment: doc._id })
        .forEach(routeDoc => {
          const routeRes = routeTransportToExcel(routeDoc._id, routeDoc, false);
          data.push(...routeRes);
        });
    });

    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Establecimientos de transporte');
    return wb;
  }
});
