import { Meteor } from 'meteor/meteor';
import { HotelSchema, Hotels } from './hotels';
import { RoomHotelSchema, RoomHotel } from './roomhotel';
import { RateHotelSchema, RateHotel } from './ratehotel';
import { operator } from '../roles/roles';
import HotelQuerySchema from './hotelQuery';
import userActivities from '../userActivities/userActivities';

Meteor.methods({
  // Metodos para hoteles
  insertHotel: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      HotelSchema.validate(doc);
      Hotels.insert(doc, function(err, docId){
        userActivities.insert({
          userId: Meteor.userId(),
          user: Meteor.user().profile.firstName,
          activity: 'agregó',
          collection: 'hotels',
          registerId: docId,
          register: doc.name,
          date: new Date()
        });
      });
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

      userActivities.insert({
        userId: Meteor.userId(),
        user: Meteor.user().profile.firstName,
        activity: 'editó',
        collection: 'hotels',
        registerId: _id,
        register: doc.name,
        date: new Date()
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

      userActivities.insert({
        userId: Meteor.userId(),
        user: Meteor.user().profile.firstName,
        activity: 'eliminó',
        collection: 'hotels',
        registerId: '',
        register: doc.name,
        date: new Date()
      });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  // Metodos para habitaciones
  addRoomHotel: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      RoomHotelSchema.validate(doc);
      RoomHotel.insert(doc, function(err, docId){
        userActivities.insert({
          userId: Meteor.userId(),
          user: Meteor.user().profile.firstName,
          activity: 'agregó',
          collection: 'roomhotel',
          registerId: doc.idHotel,
          register: '',
          date: new Date()
        });
      });
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

      userActivities.insert({
        userId: Meteor.userId(),
        user: Meteor.user().profile.firstName,
        activity: 'editó',
        collection: 'roomhotel',
        registerId: [doc.idHotel, _id],
        register: '',
        date: new Date()
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  deleteRoomHotel: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      RoomHotel.remove({ _id: id });
      userActivities.insert({
        userId: Meteor.userId(),
        user: Meteor.user().profile.firstName,
        activity: 'eliminó',
        collection: 'roomhotel',
        registerId: '',
        register: '',
        date: new Date()
      });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  // Metodos para tarifas
  addRateHotel: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      RateHotelSchema.validate(doc);
      RateHotel.insert(doc);

      userActivities.insert({
        userId: Meteor.userId(),
        user: Meteor.user().profile.firstName,
        activity: 'agregó',
        collection: 'ratehotel',
        registerId: doc.idHotel,
        register: '',
        date: new Date()
      });
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

      userActivities.insert({
        userId: Meteor.userId(),
        user: Meteor.user().profile.firstName,
        activity: 'editó',
        collection: 'ratehotel',
        registerId: [doc.idHotel, _id],
        register: '',
        date: new Date()
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  deleteRateHotel: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      RateHotel.remove({ _id: id });
      userActivities.insert({
        userId: Meteor.userId(),
        user: Meteor.user().profile.firstName,
        activity: 'eliminó',
        collection: 'ratehotel',
        registerId: '',
        register: '',
        date: new Date()
      });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  findHotel: function (doc) {
    HotelQuerySchema.validate(doc);
    var docVals = JSON.parse(JSON.stringify(doc));
    // if (Roles.userIsInRole(Meteor.userId(), operator)) {
    // Hotels.find(doc);
    if (doc.website) {
      doc.website = new RegExp(`.*${doc.website}.*`, 'i');
    } else {
      docVals.website = 'No definido.';
    }

    if (doc.name)
      doc.name = new RegExp('.*' + doc.name + '.*', 'i');
    else
      docVals.name = 'No definido.';

    if (doc.street)
      doc.street = new RegExp('.*' + doc.street + '.*', 'i');
    else
      docVals.street = 'No definido.';

    if (doc.city)
      doc.city = new RegExp('.*' + doc.city + '.*', 'i');
    else
      docVals.city = 'No definido.';

    if (doc.municipality)
      doc.municipality = new RegExp('.*' + doc.municipality + '.*', 'i');
    else
      docVals.municipality = 'No definido.';

    if (!doc.departament)
      docVals.departament = 'No definido.';

    if (!doc.categorization)
      docVals.categorization = 'No definido.';
    else {
      docVals.categorization += (docVals.categorization == '1')?' estrella':' estrellas';
    }

    if (doc.coin) {
      doc.coin = {$in : doc.coin};
    } else {
      docVals.coin = ['No definido.'];
    }

    if (doc.phone){
      const arr = doc.phone.map(Element => new RegExp(`.*${Element}.*`,'i'));
      doc.phone = {$in : arr};
    } else {
      docVals.phone = ['No definido.'];
    }

    if (doc.services) {
      const arr = doc.services.map(Element => new RegExp(`.*${Element}.*`,'i'));
      doc.services = {$in : arr};
    } else {
      docVals.services = ['No definido.'];
    }

    if (doc.paymentsMethod){
      doc.paymentsMethod = {$in : doc.paymentsMethod};
    } else {
      docVals.paymentsMethod = ['No definido.']
    }

    if (doc.informationsAB){
      const arr = doc.informationsAB.map(Element => new RegExp(`.*${Element}.*`,'i'));
      doc.informationsAB = {$in : arr};
    } else {
      docVals.informationsAB = ['No definido.'];
    }

    if (doc.contact){
      const arr = doc.contact.map(Element => new RegExp(`.*${Element}.*`,'i'));
      doc.contact = {$in : arr};
    } else {
      docVals.contact = ['No definido.'];
    }

    if (doc.activities){
      const arr = doc.activities.map(Element => new RegExp(`.*${Element}.*`,'i'));
      doc.activities = {$in : arr};
    } else {
      docVals.activities = ['No definido.'];
    }
    return {doc: doc, docVals: docVals};
  }

});
