import { Meteor } from 'meteor/meteor';
import { Attractions } from '../attractions';

Meteor.publish('attraction.one', id => Attractions.find({ _id: id }));

Meteor.publish('attractions.all', () => Attractions.find());
