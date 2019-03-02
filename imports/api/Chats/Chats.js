import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { messages } from '../regEx';

SimpleSchema.extendOptions(['autoform']);

const Chats = new Mongo.Collection('chats');

/**
 * Status options:
 * 0 = NO Sent
 * 1 = Sent / NO received
 * 2 = Recieved
 * 3 = Read
 */

const ChatSchema = new SimpleSchema({
  idIssuer: {
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
