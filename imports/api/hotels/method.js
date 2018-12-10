import { Meteor } from 'meteor/meteor';
import { HotelSchema, Hotels } from './hotels';
import { RoomHotelSchema, RoomHotel } from './roomhotel';
import { RateHotelSchema, RateHotel } from './ratehotel';
import { operator } from '../roles/roles';
import HotelQuerySchema from './hotelQuery';

Meteor.methods({
  // Metodos para hoteles
  insertHotel: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      HotelSchema.validate(doc);
      Hotels.insert(doc);
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  editHotel: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      const data = doc.modifier.$set;
      const { _id } = doc;
      HotelSchema.validate(data);
      Hotels.update({ _id: _id }, {
        $set: data
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  deleteHotel: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      Hotels.remove({ _id: id });
      RoomHotel.remove({ idHotel: id });
      RateHotel.remove({ idHotel: id });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  // Metodos para habitaciones
  addRoomHotel: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      RoomHotelSchema.validate(doc);
      RoomHotel.insert(doc);
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  editRoomHotel: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      const data = doc.modifier.$set;
      const { _id } = doc;
      RoomHotelSchema.validate(data);
      RoomHotel.update({ _id: _id }, {
        $set: data
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  deleteRoomHotel: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      RoomHotel.remove({ _id: id });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  // Metodos para tarifas
  addRateHotel: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      RateHotelSchema.validate(doc);
      RateHotel.insert(doc);
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  editRateHotel: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      const data = doc.modifier.$set;
      const { _id } = doc;
      RateHotelSchema.validate(data);
      RateHotel.update({ _id: _id }, {
        $set: data
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  deleteRateHotel: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      RateHotel.remove({ _id: id });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  findHotel: function (doc) {
    HotelQuerySchema.validate(doc);
    var docVals = JSON.parse(JSON.stringify(doc));
    // if (Roles.userIsInRole(Meteor.userId(), operator)) {
    // Hotels.find(doc);
    if (doc.name)
      doc.name = new RegExp('.*' + doc.name + '.*');
    else
      docVals.name = "No definido.";
    
    if (doc.street)
      doc.street = new RegExp('.*' + doc.street + '.*');
    else
      docVals.street = "No definido.";

    if (doc.city)
      doc.city = new RegExp('.*' + doc.city + '.*');
    else
      docVals.city = "No definido.";

    if (doc.municipality)
      doc.municipality = new RegExp('.*' + doc.municipality + '.*');
    else
      docVals.municipality = "No definido.";
      
    if (!doc.departament)
      docVals.departament = "No definido.";

    if (!doc.phone)
      docVals.phone = "No definido.";

    if (!doc.categorization)
      docVals.categorization = "No definido.";
    else
      docVals.categorization += "estrellas"
    
    if (doc.coin) {
      var newArr = [];
      for(i = 0; i < doc.coin.length; i++)
        newArr[i] = new RegExp('.*' + doc.coin[i] + '.*');
      doc.coin = {$in : []}
      doc.coin.$in = newArr
    } else {
      docVals.coin = "No definido." 
    }

    if (doc.services) {
      var newArr = [];
      for(i = 0; i < doc.services.length; i++)
        newArr[i] = new RegExp('.*' + doc.services[i] + '.*');
      doc.services = {$in : []}
      doc.services.$in = newArr
    } else {
      docVals.services = "No definido." 
    }

    if (doc.paymentsMethod){
      var newArr = [];
      for(i = 0; i < doc.paymentsMethod.length; i++)
        newArr[i] = new RegExp('.*' + doc.paymentsMethod[i] + '.*');
      doc.paymentsMethod = {$in : []}
      doc.paymentsMethod.$in = newArr
    } else {
      docVals.paymentsMethod = "No definido." 
    }

    if (doc.informationsAB){
      var newArr = [];
      for(i = 0; i < doc.informationsAB.length; i++)
        newArr[i] = new RegExp('.*' + doc.informationsAB[i] + '.*');
      doc.informationsAB = {$in : []}
      doc.informationsAB.$in = newArr
    } else {
      docVals.informationsAB = "No definido." 
    }

    if (doc.activities){
      var newArr = [];
      for(i = 0; i < doc.activities.length; i++)
        newArr[i] = new RegExp('.*' + doc.activities[i] + '.*');
      doc.activities = {$in : []}
      doc.activities.$in = newArr
    } else {
      docVals.activities = "No definido." 
    }

    console.log(doc);
    console.log(docVals);
    return {doc: doc, docVals: docVals};
    /* } else {
      throw new Meteor.Error('Permiso Denegado');
    } */
  }

});
