import './addRestaurant.html';
import { RestaurantSchema } from '../../../api/restaurants/AddRestaurants';

Template.addRestaurant.helpers({
  RestaurantSchema: () => RestaurantSchema
});
