import { Meteor } from 'meteor/meteor';
import { Guide, GuideSchema } from './guide';
import { operator } from '../roles/roles';
import GuideConsultSchema from './guideConsult';

Meteor.methods({
  insertGuide: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      GuideSchema.validate(doc);
      Guide.insert(doc);
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  updateGuide: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      const data = doc.modifier.$set;
      const { _id } = doc;
      GuideSchema.validate(data);
      Guide.update({ _id: _id }, {
        $set: data
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  deleteGuide: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      Guide.remove({ _id: id });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  findGuide: function (doc) {
    GuideConsultSchema.validate(doc);
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
    if (query.destination) {
      const regStr = query.destination.split(/ /).join('|');
      const regex = new RegExp(regStr, 'i');
      query.destination = { $regex: regex };
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
    if (query.language) {
      query.language = { $in: query.query };
    }
    if (query.creditCards) {
      query.creditCards = { $in: query.query };
    }
    return { doc, query };
  }
});
