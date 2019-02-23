import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import { messages } from '../regEx';
// import { moment } from 'moment';

// userId, user, activity, collection, registerId, register, date
const userActivities = new Mongo.Collection('userActivities');

const moment = require('moment');

require('moment/min/locales.min');

moment.locale('es');

userActivities.helpers({
  fecha: () => moment().format('MMMM D YYYY, hh:mm a')
});

const userActivitiesSchema = new SimpleSchema({
  userId: {
    type: String,
    label: 'Nombre'
  },
  user: {
    type: String,
    label: 'Nombre'
  },
  activity: {
    type: String,
    label: 'Nombre'
  },
  collection: {
    type: String,
    label: 'Nombre'
  },
  registerId: {
    type: String,
    label: 'Nombre'
  },
  register: {
    type: String,
    label: 'Nombre'
  },
  date: {
    type: Date,
    label: 'Nombre'
  }
}, { check: check, tracker: Tracker });

userActivitiesSchema.messageBox.messages(messages);

userActivities.attachSchema(userActivitiesSchema);

export { userActivities, userActivitiesSchema };
