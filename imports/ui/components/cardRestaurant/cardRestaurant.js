import './cardRestaurant.html';
import { unpackageRestaurant } from '../../../startup/client/packageFunction';
import RestaurantImages from '../../../api/restaurants/restaurantImage';

Template.cardRestaurant.events({
  'click #unPackageRestaurant': function () {
    unpackageRestaurant();
  }
});

Template.cardRestaurant.helpers({
  findImg (_id) {
    return RestaurantImages.findOne({ _id });
  },
  first (index) {
    return index === 0;
  }
});
