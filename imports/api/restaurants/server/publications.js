import { Meteor } from 'meteor/meteor';
import { Restaurants } from '../restaurants';
import { restaurantOffers } from '../restaurantOffers';

Meteor.publish('restaurant.one', id => Restaurants.find({ _id: id }));

Meteor.publish('restaurant.all', () => Restaurants.find());

Meteor.publish('restaurantOffers.all', () => restaurantOffers.find());
