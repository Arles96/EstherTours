import { Meteor } from 'meteor/meteor';
import { Renters } from '../renters';
import { FleetRenter } from '../fleetRenter';
import FleetRenterImage from '../fleetRenterImage';

Meteor.publish('renter.one', id => Renters.find({ _id: id }));

Meteor.publish('renter.all', () => Renters.find());

Meteor.publish('fleetRenter.all', () => FleetRenter.find());

Meteor.publish('FleetRenterImage.all', () => FleetRenterImage.find().cursor);
