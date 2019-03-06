import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { messages } from '../regEx';

const Position = new Mongo.Collection('position');

SimpleSchema.extendOptions(['autoform']);

const PositionSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre del Cargo'
  },
  userId: {
    type: String,
    optional: true,
    autoValue: () => Meteor.userId()
  },
  createAt: {
    type: Date,
    optional: true,
    autoValue: () => Meteor.userId()
  }
}, { check: check, tracker: Tracker });

PositionSchema.messageBox.messages(messages);

Position.attachSchema(PositionSchema);

export {
  Position,
  PositionSchema
};
