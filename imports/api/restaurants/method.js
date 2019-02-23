import { Meteor } from 'meteor/meteor';
import { RestaurantSchema, Restaurants } from './restaurants';
import { restaurantOffers, restaurantOffersSchema } from './restaurantOffers';
import RestaurantConsultSchema from './restaurantConsult';
import { operator } from '../roles/roles';
import { userActivities } from '../userActivities/userActivities';

Meteor.methods({
  addRestaurant: function (doc) {
    RestaurantSchema.validate(doc);
    Restaurants.insert(doc);
    userActivities.insert({
      userId: Meteor.userId(),
      user: Meteor.user().profile.firstName,
      activity: 'agregó',
      collection: 'restaurantes',
      registerId: '',
      register: doc.name,
      date: new Date()
    });
  },
  addRestaurantBranch: function (doc) {
    RestaurantSchema.validate(doc);

    const query = {
      street: doc.street,
      municipality: doc.municipality,
      city: doc.city,
      department: doc.department
    };

    if (Restaurants.find(query).map(d => d).length > 0) {
      throw new Meteor.Error('Repeated Branch');
    } else {
      Restaurants.insert(doc);
      userActivities.insert({
        userId: Meteor.userId(),
        user: Meteor.user().profile.firstName,
        activity: 'agregó sucursal',
        collection: 'restaurantes',
        registerId: '',
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
      Restaurants.update({ _id: _id }, {
        $set: data
      });
      userActivities.insert({
        userId: Meteor.userId(),
        user: Meteor.user().profile.firstName,
        activity: 'editó',
        collection: 'restaurantes',
        registerId: _id,
        register: doc.name,
        date: new Date()
      });
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
        user: Meteor.user().profile.firstName,
        activity: 'agregó',
        collection: 'restaurantOffers',
        registerId: '',
        register: doc.dishName,
        date: new Date()
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  deleteRestaurant: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      Restaurants.remove({ _id: id });
      restaurantOffers.remove({ idRestaurant: id });
      userActivities.insert({
        userId: Meteor.userId(),
        user: Meteor.user().profile.firstName,
        activity: 'eliminó',
        collection: 'restaurantes',
        registerId: '',
        register: '',
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
        user: Meteor.user().profile.firstName,
        activity: 'eliminó',
        collection: 'restaurantOffers',
        registerId: '',
        register: '',
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
          user: Meteor.user().profile.firstName,
          activity: 'editó',
          collection: 'restaurantOffers',
          registerId: '',
          register: doc.dishName,
          date: new Date()
        });
      } else {
        throw new Meteor.Error('No se permiten valores repetidos en telefonos.');
      }
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  }
});
