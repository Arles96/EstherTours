import { Meteor } from 'meteor/meteor';
import { Position, PositionSchema } from './position';
import { admin, supervisor } from '../roles/roles';

Meteor.methods({
  insertPosition: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), admin) ||
      Roles.userIsInRole(Meteor.userId(), supervisor)) {
      PositionSchema.validate(doc);
      Position.insert(doc);
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  updatePosition: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), admin) ||
      Roles.userIsInRole(Meteor.userId(), supervisor)) {
      const data = doc.modifier.$set;
      const { _id } = doc;
      PositionSchema.validate(data);
      Position.update({ _id }, {
        $set: {
          name: data.name
        }
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  removePosition: function (_id) {
    if (Meteor.userIsInRole(Meteor.userId(), admin) ||
      Roles.userIsInRole(Meteor.userId(), supervisor)) {
      if (!Meteor.users.findOne({ 'profile.position': _id })) {
        Position.remove({ _id });
      } else {
        throw Meteor.Error('No se puede eliminar este cargo porque esta siendo utilizado para un usuario');
      }
    } else {
      throw Meteor.Error('Permiso Denegado');
    }
  }
});
