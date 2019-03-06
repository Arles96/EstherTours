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
  fecha: function () { return moment(this.date).format('MMMM D YYYY, hh:mm a'); }
});

const userActivitiesSchema = new SimpleSchema({
  userId: {
    type: String,
    label: 'idUsuario'
  },
  user: {
    type: String,
    label: 'Usuario'
  },
  activity: {
    type: String,
    label: 'Actividad'
  },
  collection: {
    type: String,
    label: 'Entidad'
  },
  registerId: {
    type: String,
    label: 'idRegistro'
  },
  register: {
    type: String,
    label: 'registro'
  },
  date: {
    type: Date,
    label: 'Fecha'
  }
}, { check: check, tracker: Tracker });

userActivitiesSchema.messageBox.messages(messages);

// userActivities.attachSchema(userActivitiesSchema);

export { userActivities, userActivitiesSchema };
