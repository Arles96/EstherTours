import { Meteor } from 'meteor/meteor';
import { Hotels } from '../hotels';

Meteor.publish('hotel.one', id => Hotels.find({ _id: id }));
