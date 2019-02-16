import { Mongo } from 'meteor/mongo';

// userId, user, activity, collection, registerId, register, date
const userActivities = new Mongo.Collection('userActivities');

export default userActivities;
