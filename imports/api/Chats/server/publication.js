import { Meteor } from 'meteor/meteor';
import { Chats } from '../Chats';

Meteor.publish('chat.one', (idReceiver, idIssuer) => Chats.find({ idReceiver: idReceiver, idIssuer: idIssuer }));

Meteor.publish('chats.all', () => Chats.find());
