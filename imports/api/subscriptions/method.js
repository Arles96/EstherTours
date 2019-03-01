import { Meteor } from 'meteor/meteor';
import { Subscriptions, SubscriptionsSchema } from './subscriptions';
import { consultant } from '../roles/roles';

Meteor.methods({
  insertAttraction: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), consultant)) {
      SubscriptionsSchema.validate(doc);
      Subscriptions.insert(doc);
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  editAttraction: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), consultant)) {
      const data = doc.modifier.$set;
      const { _id } = doc;
      SubscriptionsSchema.validate(data);
      Subscriptions.update({ _id: _id }, {
        $set: data
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  deleteAttraction: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), consultant)) {
      Subscriptions.remove({ _id: id });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  }
});
