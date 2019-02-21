import './cardRestaurant.html';
import { unpackageRestaurant } from '../../../startup/client/packageFunction';

Template.cardRestaurant.events({
  'click #unPackageRestaurant': function () {
    unpackageRestaurant();
  }
});
