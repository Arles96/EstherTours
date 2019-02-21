import { Meteor } from 'meteor/meteor';
import { Chats } from '../Chats';

Meteor.publish('Chat.one', id => Chats.find({ _id: id }));

Meteor.publish('chats.all', () => Chats.find());
