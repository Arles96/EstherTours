import { Meteor } from 'meteor/meteor';
import { Renters } from '../renters';

Meteor.publish('renter.one', id => Renters.find({ _id: id }));
