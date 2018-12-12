/* eslint-disable prefer-template */
/* eslint-disable no-param-reassign */
import { Meteor } from 'meteor/meteor';
import { RestaurantSchema, Restaurants } from './restaurants';
import { restaurantOffers, restaurantOffersSchema } from './restaurantOffers';
import RestaurantConsultSchema from './restaurantConsult';
import { operator } from '../roles/roles';

Meteor.methods({
  addRestaurant: function (doc) {
    RestaurantSchema.validate(doc);
    Restaurants.insert(doc);
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
      query.services = { $in: query.services };
    }
    if (query.paymentMethods) {
      query.paymentMethods = { $in: query.query };
    }
    if (query.money) {
      query.money = { $in: query.money };
    }
    if (query.menages) {
      query.menages = { $in: query.menages };
    }
    if (query.ambience) {
      query.ambience = { $in: query.ambience };
    }
    if (query.menu) {
      query.menu = { $in: query.menu };
    }
    console.log(query);
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
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  addRestaurantOffer: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      restaurantOffersSchema.validate(doc);
      restaurantOffers.insert(doc);
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  deleteRestaurant: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      Restaurants.remove({ _id: id });
      restaurantOffers.remove({ idRestaurant: id });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  deleteRestaurantOffer: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      restaurantOffers.remove({ _id: id });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  editRestaurantOffer: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      const data = doc.modifier.$set;
      const { _id } = doc;
      restaurantOffersSchema.validate(data);
      restaurantOffers.update({ _id: _id }, {
        $set: data
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  }
});
