import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';
import { messages, RegExObj } from '../regEx';

const Subscriptions = new Mongo.Collection('subscriptions');

SimpleSchema.extendOptions(['autoform']);

const SubscriptionsSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre'
  },
  email: {
    type: String,
    label: 'Correo',
    regEx: RegExObj.email,
    custom: function () {
      const query = { email: this.value };
      if (this.isUpdate) {
        query._id = { $ne: this.docId };
      }
      const repeated = Subscriptions.findOne(query);
      if (repeated) {
        // XXX bug
        return 'duplicateEmail';
      }
      return 1;
    }
  },
  telephone: {
    type: String,
    label: 'Teléfono',
    optional: true,
    regEx: RegExObj.phone
  },
  subscribed: {
    type: Boolean,
    label: 'Suscrito',
    defaultValue: true
  },
  userId: {
    type: String,
    optional: true,
    autoValue: () => Meteor.userId()
  },
  createAt: {
    type: Date,
    optional: true,
    autoValue: () => new Date()
  }
}, { check: check, tracker: Tracker });

SubscriptionsSchema.messageBox.messages(messages);
Subscriptions.attachSchema(SubscriptionsSchema);

Subscriptions.helpers({
  textSubs: function () {
    if (this.subscribed) {
      return 'Si';
    } else {
      return 'No';
    }
  }
});

export {
  Subscriptions,
  SubscriptionsSchema
};
