import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';
import { RestaurantSchema, Restaurants, restaurantToExcel } from './restaurants';
import { restaurantOffers, restaurantOffersSchema } from './restaurantOffers';
import RestaurantConsultSchema from './restaurantConsult';
import { userActivities } from '../userActivities/userActivities';
import { operator } from '../roles/roles';

Meteor.methods({
  addRestaurant: function (doc) {
    RestaurantSchema.validate(doc);
    Restaurants.insert(doc);
    userActivities.insert({
      userId: Meteor.userId(),
      user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
      activity: 'agregó',
      collection: 'restaurantes',
      registerId: 'N/D',
      register: doc.name,
      date: new Date()
    });
  },
  addRestaurantBranch: function (doc) {
    RestaurantSchema.validate(doc);

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

    const parentCheck = Restaurants.findOne(queryP);
    const siblingCheck = Restaurants.findOne(queryS);

    if (parentCheck || siblingCheck) {
      throw new Meteor.Error('Repeated Branch');
    } else {
      Restaurants.insert(doc);
      userActivities.insert({
        userId: Meteor.userId(),
        user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
        activity: 'agregó sucursal',
        collection: 'restaurantes',
        registerId: 'N/D',
        register: doc.name,
        date: new Date()
      });
    }
  },
  consultRestaurant: function (doc) {
    RestaurantConsultSchema.validate(doc);
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
    if (query.municipality) {
      const regStr = query.municipality.split(/ /).join('|');
      const regex = new RegExp(regStr, 'i');
      query.municipality = { $regex: regex };
    }
    if (query.city) {
      const regStr = query.city.split(/ /).join('|');
      const regex = new RegExp(regStr, 'i');
      query.city = { $regex: regex };
    }
    if (query.services) {
      const arr = query.services.map(Element => new RegExp(`.*${Element}.*`, 'i'));
      query.services = { $in: arr };
    }
    if (query.paymentMethods) {
      query.paymentMethods = { $in: query.paymentMethods };
    }
    if (query.money) {
      query.money = { $in: query.money };
    }
    if (query.menages) {
      const arr = query.menages.map(Element => new RegExp(`.*${Element}.*`, 'i'));
      query.menages = { $in: arr };
    }
    if (query.telephone) {
      const arr = query.telephone.map(Element => new RegExp(`.*${Element}.*`, 'i'));
      query.telephone = { $in: arr };
    }
    if (query.ambience) {
      const arr = query.ambience.map(Element => new RegExp(`.*${Element}.*`, 'i'));
      query.ambience = { $in: arr };
    }
    if (query.menu) {
      const arr = query.menu.map(Element => new RegExp(`.*${Element}.*`, 'i'));
      query.menu = { $in: arr };
    }
    return { doc, query };
  },
  editRestaurant: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      const data = doc.modifier.$set;
      const { _id } = doc;
      RestaurantSchema.validate(data);

      userActivities.insert({
        userId: Meteor.userId(),
        user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
        activity: 'editó',
        collection: 'restaurantes',
        registerId: _id,
        register: doc.name,
        date: new Date()
      });

      const query = {
        _id: { $ne: _id },
        street: data.street,
        municipality: data.municipality,
        city: data.city,
        department: data.department,
        branchOffice: true,
        mainOffice: data.mainOffice
      };

      const repeatedCheck = Restaurants.findOne(query);

      if (repeatedCheck) {
        throw new Meteor.Error('Repeated Branch');
      } else {
        Restaurants.update({ _id: _id }, {
          $set: data
        });
      }
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  addRestaurantOffer: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      restaurantOffersSchema.validate(doc);
      restaurantOffers.insert(doc);
      userActivities.insert({
        userId: Meteor.userId(),
        user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
        activity: 'agregó',
        collection: 'restaurantOffers',
        registerId: 'N/D',
        register: doc.dishName,
        date: new Date()
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  deleteRestaurant: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      Restaurants
        .find({ branchOffice: true, mainOffice: id })
        .forEach(doc => {
          Restaurants.remove({ _id: doc._id });
          restaurantOffers.remove({ idRestaurant: doc._id });
        });
      Restaurants.remove({ _id: id });
      restaurantOffers.remove({ idRestaurant: id });
      userActivities.insert({
        userId: Meteor.userId(),
        user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
        activity: 'eliminó',
        collection: 'restaurantes',
        registerId: 'N/D',
        register: 'N/D',
        date: new Date()
      });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  deleteRestaurantOffer: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      restaurantOffers.remove({ _id: id });
      userActivities.insert({
        userId: Meteor.userId(),
        user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
        activity: 'eliminó',
        collection: 'restaurantOffers',
        registerId: 'N/D',
        register: 'N/D',
        date: new Date()
      });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  editRestaurantOffer: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      const data = doc.modifier.$set;
      const { _id } = doc;
      restaurantOffersSchema.validate(data);
      const value = doc.telephone;
      if (!Restaurants.findOne(
        { telephone: { $in: value } }
      )) {
        Restaurants.update({ _id: _id }, {
          $set: data
        });
        userActivities.insert({
          userId: Meteor.userId(),
          user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
          activity: 'editó',
          collection: 'restaurantOffers',
          registerId: 'N/D',
          register: doc.dishName,
          date: new Date()
        });
      } else {
        throw new Meteor.Error('No se permiten valores repetidos en telefonos.');
      }
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  reportRestaurants: function (year) {
    const monthsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Restaurants.find().fetch().forEach(item => {
      const date = new Date(item.createAt);
      if (date.getFullYear() === year.year) {
        monthsCount[date.getMonth()] += 1;
      }
    });
    return monthsCount;
  },
  exportRestaurantsToExcel: function () {
    // workbook
    const wb = XLSX.utils.book_new();
    const data = [];

    Restaurants.find({}).forEach(doc => {
      const restaurantRes = restaurantToExcel(doc._id, doc, false);
      data.push(...restaurantRes);
    });

    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Restaurantes');
    return wb;
  }
});
