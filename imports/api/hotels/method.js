import { Meteor } from 'meteor/meteor';
import { HotelSchema, Hotels } from './hotels';
import { RoomHotelSchema, RoomHotel } from './roomhotel';
import { RateHotelSchema, RateHotel } from './ratehotel';
import { operator } from '../roles/roles';

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
  }

});
