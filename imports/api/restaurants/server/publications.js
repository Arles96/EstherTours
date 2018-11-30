import { Meteor } from 'meteor/meteor';
import { Restaurants } from '../restaurants';

Meteor.publish('restaurant.one', id => Restaurants.find({ _id: id }));
