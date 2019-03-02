import { Meteor } from 'meteor/meteor';

Meteor.publish('users.all', () => Meteor.users.find());
Meteor.publish('users.one', id => Meteor.users.find({ _id: id }));

Meteor.publish('allUsers.all', () => Meteor.users.find());
