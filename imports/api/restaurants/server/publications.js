import { Meteor } from 'meteor/meteor';
import { Restaurants } from '../restaurants';
import { restaurantOffers } from '../restaurantOffers';
import RestaurantImage from '../restaurantImage';

Meteor.publish('restaurant.one', id => Restaurants.find({ _id: id }));

Meteor.publish('restaurant.all', () => Restaurants.find());

Meteor.publish('restaurantOffers.all', () => restaurantOffers.find());

Meteor.publish('restaurantImage.all', () => RestaurantImage.find().cursor);

