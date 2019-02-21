import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { messages } from '../regEx';

SimpleSchema.extendOptions(['autoform']);

const Chats = new Mongo.Collection('Chats');

const ChatSchema = new SimpleSchema({
  idIssuer: {
    type: String,
    optional: true,
    autoValue: () => Meteor.user()._id
  },
  idReceiver: {
    type: String,
    optional: true,
    label: false,
    autoform: {
      readonly: true,
      omit: true,
      afFieldInput: {
        type: 'hidden'
      },
      afFormGroup: {
        label: false
      }
    }
  },
  message: {
    type: String,
    label: false
  },
  status: {
    type: Number,
    optional: true,
    label: false,
    autoform: {
      readonly: true,
      omit: true,
      afFieldInput: {
        type: 'hidden'
      },
      afFormGroup: {
        label: false
      }
    }
  },
  createAt: {
    type: Date,
    optional: true,
    autoValue: () => new Date()
  }
}, { check: check, tracker: Tracker });

ChatSchema.messageBox.messages(messages);
Chats.attachSchema(ChatSchema);

export {
  Chats,
  ChatSchema
};
