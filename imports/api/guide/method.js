import { Meteor } from 'meteor/meteor';
import { Guide, GuideSchema } from './guide';
import { operator } from '../roles/roles';

Meteor.methods({
  insertGuide: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      GuideSchema.validate(doc);
      Guide.insert(doc);
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  updateGuide: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      const data = doc.modifier.$set;
      const { _id } = doc;
      GuideSchema.validate(data);
      Guide.update({ _id: _id }, {
        $set: data
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  deleteGuide: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      Guide.remove({ _id: id });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  }
});
