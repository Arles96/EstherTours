import { Meteor } from 'meteor/meteor';
import { branchOffices, branchOfficeSchema } from './Offices';
import { admin } from '../roles/roles';

Meteor.methods({
  insertOffice: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), admin)) {
      const validate = branchOffices.findOne({
        $or: [{
          municipality: doc.idTransportationEstablishment,
          street: doc.street,
          city: doc.city,
          departament: doc.departament,
          phone: doc.phone
        }, {
          street: doc.street,
          city: doc.city,
          departament: doc.departament,
          phone: doc.phone
        }]
      });
      if (validate) {
        throw new Meteor.Error('Ubicación duplicada.');
      }
      branchOfficeSchema.validate(doc);
      branchOffices.insert(doc);
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  updateOffice: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), admin)) {
      const data = doc.modifier.$set;
      const { _id } = doc;
      const validate = branchOffices.find({
        $or: [{
          phone: data.phone,
          street: data.street,
          city: data.city,
          department: data.department,
          town: data.town
        }, {
          street: data.street,
          city: data.city,
          department: data.department,
          town: data.town
        }, {
          street: data.street,
          city: data.city,
          department: data.department,
          town: data.town
        }, {
          street: data.street,
          city: data.city,
          department: data.department,
          town: data.town
        }]
      }).fetch();
      if (validate.length > 0) {
        validate.forEach(value => {
          if (value._id !== doc._id) {
            throw new Meteor.Error('Ubicación duplicada.');
          }
        });
      }
      branchOfficeSchema.validate(data);
      branchOffices.update({ _id: _id }, {
        $set: data
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  deleteOffice: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), admin)) {
      branchOffices.remove({ _id: id });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  }
});
