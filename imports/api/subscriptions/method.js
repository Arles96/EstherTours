import { Meteor } from 'meteor/meteor';
import { Subscriptions, SubscriptionsSchema } from './subscriptions';
import { consultant } from '../roles/roles';

Meteor.methods({
  insertSubscription: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), consultant)) {
      SubscriptionsSchema.validate(doc);
      Subscriptions.insert(doc);
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  editSubscription: function (doc) {
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
  deleteSubscription: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), consultant)) {
      Subscriptions.remove({ _id: id });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  subscribe: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), consultant)) {
      Subscriptions.update({ _id: id }, {
        $set: {
          subscribed: true
        }
      });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  unsubscribe: function (id) {
    if (Roles.userIsInRole(Meteor.userId(), consultant)) {
      Subscriptions.update({ _id: id }, {
        $set: {
          subscribed: false
        }
      });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  }
});
