import { Meteor } from 'meteor/meteor';
import { Notifications } from '../Notification';

Meteor.publish('notification.one', id => Notifications.find({ _id: id }));

Meteor.publish('notifications.all', () => Notifications.find());
