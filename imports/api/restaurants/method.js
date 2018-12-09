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
    if (doc.name) {
      doc.name = new RegExp('.*' + doc.name + '.*', 'i');
    }
    if (doc.street) {
      doc.street = new RegExp('.*' + doc.street + '.*', 'i');
    }
    if (doc.city) {
      doc.city = new RegExp('.*' + doc.city + '.*', 'i');
    }
    console.log(Restaurants.find(doc).fetch());
    console.log('-----------------------------');
    return Restaurants.find(doc).fetch();
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
