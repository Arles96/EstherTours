import { Meteor } from 'meteor/meteor';
import { Renters } from '../renters';
import { FleetRenter } from '../fleetRenter';
import RenterImage from '../renterImage';

Meteor.publish('renter.one', id => Renters.find({ _id: id }));

Meteor.publish('renter.all', () => Renters.find());

Meteor.publish('fleetRenter.all', () => FleetRenter.find());

Meteor.publish('renterImage.all', () => RenterImage.find().cursor);
