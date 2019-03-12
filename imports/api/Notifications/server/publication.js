import { Meteor } from 'meteor/meteor';
import { Notifications } from '../Notification';

Meteor.publish('notification.one', idReceiver => Notifications.find({ idReceiver: idReceiver }));

Meteor.publish('notifications.all', () => Notifications.find());
