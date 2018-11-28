import { Meteor } from 'meteor/meteor';
import { Renters } from '../renters';

Meteor.publish('renter.one', id => Renters.findOne({ _id: id }));
