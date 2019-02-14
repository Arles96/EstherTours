import './infoRestaurantOffer.html';
import { Session } from 'meteor/session';

Template.infoRestaurantOffer.helpers({
  restaurantOffer: () => Session.get('restaurantOffers')
});
