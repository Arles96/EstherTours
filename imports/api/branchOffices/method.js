import { Meteor } from 'meteor/meteor';
import { branchOffices, branchOfficeSchema } from './Offices';
import { admin } from '../roles/roles';

Meteor.methods({
  insertOffice: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), admin)) {
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
