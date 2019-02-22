import { Meteor } from 'meteor/meteor';
import { Chats, ChatSchema } from './Chats';

Meteor.methods({
  addChat: function (doc) {
    ChatSchema.validate(doc);
    Chats.insert(doc);
  }
});
