import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';
import { messages } from '../regEx';

const SoldPackage = new Mongo.Collection('soldPackage');

SimpleSchema.extendOptions(['autoform']);

const SoldPackageSchema = new SimpleSchema({
  price: {
    type: Number,
    label: 'Precio'
  },
  namePackage: {
    type: String,
    label: 'Nombre del Paquete'
  },
  idPackage: {
    type: String,
    label: ''
  },
  feedback: {
    type: String,
    label: 'Observación de la venta',
    autoform: {
      type: 'textarea'
    }
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
  },
  sold: {
    type: Boolean,
    defaultValue: false,
    label: 'Vendido'
  }
}, { check: check, tracker: Tracker });

SoldPackageSchema.messageBox.messages(messages);

SoldPackage.attachSchema(SoldPackageSchema);

SoldPackage.helpers({
  textSold: function () {
    if (this.sold) {
      return 'Si';
    } else {
      return 'No';
    }
  }
});

export {
  SoldPackage,
  SoldPackageSchema
};
