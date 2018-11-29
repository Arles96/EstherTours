import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import { messages, RegExObj } from '../regEx';

const Guide = new Mongo.Collection('guide');

SimpleSchema.extendOptions(['autoform'])
