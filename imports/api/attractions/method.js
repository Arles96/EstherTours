import { Meteor } from 'meteor/meteor';
import { AttractionSchema, Attractions } from './attractions';
import { RateAttractionSchema, RateAttraction } from './rateattraction';
import { operator } from '../roles/roles';
import AttractionQuerySchema from './attractionQuery';

Meteor.methods({
  // Metodos para attracciones
  insertAttraction: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      AttractionSchema.validate(doc);
      Attractions.insert(doc);
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  editAttraction: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      const data = doc.modifier.$set;
      const { _id } = doc;
      AttractionSchema.validate(data);
      Attractions.update({ _id: _id }, {
        $set: data
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  deleteAttraction: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      Attractions.remove({ _id: id });
      RateAttraction.remove({ idAttraction: id });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  // Metodos para tarifas
  addRateAttraction: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      RateAttractionSchema.validate(doc);
      RateAttraction.insert(doc);
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  editRateAttraction: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      const data = doc.modifier.$set;
      const { _id } = doc;
      RateAttractionSchema.validate(data);
      RateAttraction.update({ _id: _id }, {
        $set: data
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  deleteRateAttraction: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      RateAttraction.remove({ _id: id });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  findAttraction: function (doc) {
    AttractionQuerySchema.validate(doc);
    const docVals = JSON.parse(JSON.stringify(doc));
    // if (Roles.userIsInRole(Meteor.userId(), operator)) {
    // Attractions.find(doc);
    if (doc.name) {
      doc.name = new RegExp(`.*${doc.name}.*`, 'i');
    } else {
      docVals.name = 'No definido.';
    }

    if (doc.street) {
      doc.street = new RegExp(`.*${doc.street}.*`, 'i');
    } else {
      docVals.street = 'No definido.';
    }

    if (doc.city) {
      doc.city = new RegExp(`.*${doc.city}.*`, 'i');
    } else {
      docVals.city = 'No definido.';
    }

    if (doc.municipality) {
      doc.municipality = new RegExp(`.*${doc.municipality}.*`, 'i');
    } else {
      docVals.municipality = 'No definido.';
    }

    if (!doc.departament) {
      docVals.departament = 'No definido.';
    }

    if (!doc.phone) {
      docVals.phone = 'No definido.';
    }

    if (!doc.categorization) {
      docVals.categorization = 'No definido.';
    } else {
      docVals.categorization += (docVals.categorization === '1') ? ' estrella' : ' estrellas';
    }

    if (doc.coin) {
      doc.coin = { $in: doc.coin };
    } else {
      docVals.coin = ['No definido.'];
    }

    if (doc.services) {
      const arr = doc.services.map(Element => new RegExp(`.*${Element}.*`, 'i'));
      doc.services = { $in: arr };
    } else {
      docVals.services = ['No definido.'];
    }

    if (doc.paymentsMethod) {
      doc.paymentsMethod = { $in: doc.paymentsMethod };
    } else {
      docVals.paymentsMethod = ['No definido.'];
    }

    if (doc.informationsAB) {
      const arr = doc.informationsAB.map(Element => new RegExp(`.*${Element}.*`, 'i'));
      doc.informationsAB = { $in: arr };
    } else {
      docVals.informationsAB = ['No definido.'];
    }

    if (doc.activities) {
      const arr = doc.activities.map(Element => new RegExp(`.*${Element}.*`, 'i'));
      doc.activities = { $in: arr };
    } else {
      docVals.activities = ['No definido.'];
    }

    console.log('method attractions', { doc, docVals });
    return { doc, docVals };
  }

});
