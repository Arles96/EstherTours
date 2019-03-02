import { Meteor } from 'meteor/meteor';
import { Subscriptions } from '../subscriptions';

Meteor.publish('subscription.one', id => Subscriptions.find({ _id: id }));
Meteor.publish('subscriptions.all', () => Subscriptions.find());
