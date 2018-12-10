import { Meteor } from 'meteor/meteor';
import { TransportationEstablishments } from '../TransportationEstablishment';

Meteor.publish('TransportationEstablishment.one', id => TransportationEstablishments.find({ _id: id }));
