import { Meteor } from 'meteor/meteor';
import { AttractionSchema, Attractions } from './attractions';
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
  findAttraction: function (doc) {
    const cDoc = doc;
    AttractionQuerySchema.validate(doc);
    const docVals = JSON.parse(JSON.stringify(doc));

    if (cDoc.name) {
      cDoc.name = new RegExp(`.*${cDoc.name}.*`, 'i');
    } else {
      docVals.name = 'No definido.';
    }

    if (cDoc.type) {
      cDoc.type = new RegExp(`.*${cDoc.type}.*`, 'i');
    } else {
      docVals.type = 'No definido.';
    }

    if (cDoc.price) {
      cDoc.price = new RegExp(`.*${cDoc.price}.*`, 'i');
    } else {
      docVals.price = 'No definido.';
    }

    if (cDoc.guide) {
      cDoc.guide = new RegExp(`.*${cDoc.guide}.*`, 'i');
    } else {
      docVals.guide = 'No definido.';
    }

    if (cDoc.street) {
      cDoc.street = new RegExp(`.*${cDoc.street}.*`, 'i');
    } else {
      docVals.street = 'No definido.';
    }

    if (cDoc.city) {
      cDoc.city = new RegExp(`.*${cDoc.city}.*`, 'i');
    } else {
      docVals.city = 'No definido.';
    }

    if (cDoc.municipality) {
      cDoc.municipality = new RegExp(`.*${cDoc.municipality}.*`, 'i');
    } else {
      docVals.municipality = 'No definido.';
    }

    if (!cDoc.departament) {
      docVals.departament = 'No definido.';
    }

    if (!cDoc.categorization) {
      docVals.categorization = 'No definido.';
    } else {
      docVals.categorization += (docVals.categorization === '1') ? ' estrella' : ' estrellas';
    }

    if (cDoc.coin) {
      cDoc.coin = { $in: cDoc.coin };
    } else {
      docVals.coin = ['No definido.'];
    }

    if (doc.contact){
      const arr = doc.contact.map(Element => new RegExp(`.*${Element}.*`,'i'));
      doc.contact = {$in : arr};
    } else {
      docVals.contact = ["No definido."];
    }

    if (cDoc.paymentsMethod) {
      cDoc.paymentsMethod = { $in: cDoc.paymentsMethod };
    } else {
      docVals.paymentsMethod = ['No definido.'];
    }

    return { doc: cDoc, docVals: docVals };
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
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  }

});
