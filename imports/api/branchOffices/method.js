import { Meteor } from 'meteor/meteor';
import { branchOffices, branchOfficeSchema } from './Offices';
import {
  admin,
  operator,
  consultant,
  supervisor
} from '../roles/roles';

Meteor.methods({
  insertOffice: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), admin) ||
      Roles.userIsInRole(Meteor.userId(), supervisor)) {
      const validate = branchOffices.findOne({
        $or: [{
          municipality: doc.municipality,
          street: doc.street,
          city: doc.city,
          departament: doc.departament,
          phone: doc.phone
        }, {
          street: doc.street,
          city: doc.city,
          municipality: doc.municipality,
          departament: doc.departament
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
    if (Roles.userIsInRole(Meteor.userId(), admin) ||
      Roles.userIsInRole(Meteor.userId(), supervisor)) {
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
    if (Roles.userIsInRole(Meteor.userId(), admin) ||
      Roles.userIsInRole(Meteor.userId(), supervisor)) {
      branchOffices.remove({ _id: id });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  reportOffices: function (year) {
    if (Roles.userIsInRole(Meteor.userId(), operator) ||
      Roles.userIsInRole(Meteor.userId(), consultant) ||
      Roles.userIsInRole(Meteor.userId(), admin) ||
      Roles.userIsInRole(Meteor.userId(), supervisor)
    ) {
      const monthsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      branchOffices.find().fetch().forEach(item => {
        const date = new Date(item.createAt);
        if (date.getFullYear() === year.year) {
          monthsCount[date.getMonth()] += 1;
        }
      });
      return monthsCount;
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  }
});
