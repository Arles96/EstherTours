import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';
import { messages, RegExObj } from '../regEx';

const Subscriptions = new Mongo.Collection('subscriptions');

SimpleSchema.extendOptions(['autoform']);

const SubscriptionsSchema = new SimpleSchema({
  names: {
    type: String,
    label: 'Nombres'
  },
  surnames: {
    type: String,
    label: 'Apellidos'
  },
  email: {
    type: String,
    label: 'Correo',
    unique: true,
    regEx: RegExObj.email
  },
  telephone: {
    type: String,
    label: 'Teléfono',
    optional: true,
    regEx: RegExObj.phone
  },
  createAt: {
    type: Date,
    optional: true,
    autoValue: () => new Date()
  }
}, { check: check, tracker: Tracker });

SubscriptionsSchema.messageBox.messages(messages);

Subscriptions.attachSchema(SubscriptionsSchema);

export {
  Subscriptions,
  SubscriptionsSchema
};
