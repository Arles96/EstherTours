import { Mongo } from 'meteor/mongo';
// import { moment } from 'moment';

// userId, user, activity, collection, registerId, register, date
const userActivities = new Mongo.Collection('userActivities');

const moment = require('moment');

require('moment/min/locales.min');

moment.locale('es');

userActivities.helpers({
  fecha: () => moment().format('MMMM D YYYY, hh:mm a')
});

export default userActivities;
