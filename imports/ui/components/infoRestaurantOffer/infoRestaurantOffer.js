import './infoRestaurantOffer.html';
import { Session } from 'meteor/session';

Template.infoRestaurantOffer.helpers({
  restaurantOffer: () => {
    console.log(Session.get('restaurantOffers'));
    return Session.get('restaurantOffers');
  }
});
