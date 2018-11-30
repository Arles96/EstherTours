import './infoRestaurantOffer.html';
import { Session } from 'meteor/session';

Template.infoRestaurantOffer.helpers({
  restaurantOffer: () => {
    console.log(Session.get('restaurantOffer'));
    return Session.get('restaurantOffer');
  }
});
