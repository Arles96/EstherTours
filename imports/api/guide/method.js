import { Meteor } from 'meteor/meteor';
import { Guide, GuideSchema } from './guide';
import { operator, consultant, admin } from '../roles/roles';
import GuideConsultSchema from './guideConsult';
import { userActivities } from '../userActivities/userActivities';

Meteor.methods({
  insertGuide: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      GuideSchema.validate(doc);
      Guide.insert(doc);
      userActivities.insert({
        userId: Meteor.userId(),
        user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
        activity: 'agregó',
        collection: 'guías',
        registerId: 'N/D',
        register: doc.name,
        date: new Date()
      });
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

      userActivities.insert({
        userId: Meteor.userId(),
        user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
        activity: 'editó',
        collection: 'guías',
        registerId: 'N/D',
        register: doc.name,
        date: new Date()
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  deleteGuide: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      Guide.remove({ _id: id });
      userActivities.insert({
        userId: Meteor.userId(),
        user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
        activity: 'eliminó',
        collection: 'guías',
        registerId: 'N/D',
        register: 'N/D',
        date: new Date()
      });
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
    if (query.destination) {
      const regStr = query.destination.split(/ /).join('|');
      const regex = new RegExp(regStr, 'i');
      query.destination = { $regex: regex };
    }
    if (query.services) {
      const arr = query.services.map(element => new RegExp(`.*${element}.*`, 'i'));
      query.services = { $in: arr };
    }
    if (query.paymentMethods) {
      query.paymentMethods = { $in: query.paymentMethods };
    }
    if (query.money) {
      query.money = { $in: query.money };
    }
    if (query.language) {
      query.language = { $in: query.language };
    }
    if (query.creditCards) {
      query.creditCards = { $in: query.creditCards };
    }
    return { doc, query };
  },
  reportGuides: function (year) {
    if (Roles.userIsInRole(Meteor.userId(), operator) ||
      Roles.userIsInRole(Meteor.userId(), consultant) ||
      Roles.userIsInRole(Meteor.userId(), admin)
    ) {
      const monthsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      Guide.find().fetch().forEach(item => {
        const date = new Date(item.createAt);
        if (date.getFullYear() === year.year) {
          monthsCount[date.getMonth()] += 1;
        }
      });
      return monthsCount;
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  }
});
