import { Meteor } from 'meteor/meteor';
import { Notifications } from './Notification';

Meteor.methods({
  addNotification: function (doc) {
    Notifications.insert(doc);
  },
  getNotification: function (doc) {
    return Notifications.findOne(doc);
  },
  removeNotifications: function (doc) {
    Notifications.remove(doc, { multi: true });
  }
});
