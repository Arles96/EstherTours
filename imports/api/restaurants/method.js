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

    const parentCheck = Restaurants.find(queryP).map(d => d);
    const siblingCheck = Restaurants.find(queryS).map(d => d);

    if (parentCheck.length > 0 || siblingCheck.length > 0) {
      throw new Meteor.Error('Repeated Branch');
    } else {
      Restaurants.insert(doc);
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

      const query = {
        street: data.street,
        municipality: data.municipality,
        city: data.city,
        department: data.department,
        branchOffice: true,
        mainOffice: data.mainOffice
      };

      const repeatedCheck = Restaurants.find(query).map(d => d);

      if (repeatedCheck.length > 0) {
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
      const value = doc.telephone;
      if (!Restaurants.findOne(
        { telephone: { $in: value } }
      )) {
        Restaurants.update({ _id: _id }, {
          $set: data
        });
      } else {
        throw new Meteor.Error('No se permiten valores repetidos en telefonos.');
      }
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  }
});
