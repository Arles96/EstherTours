import { Meteor } from 'meteor/meteor';
import { RestaurantSchema, Restaurants } from './restaurants';

Meteor.methods({
  addRestaurant: function (doc) {
    RestaurantSchema.validate(doc);
    Restaurants.insert(doc);
  }
});
