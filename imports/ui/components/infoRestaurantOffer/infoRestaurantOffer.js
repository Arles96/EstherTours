import './infoRestaurantOffer.html';
import { Session } from 'meteor/session';
import '../../components/toDecimal/toDecimal';

Template.infoRestaurantOffer.helpers({
  restaurantOffer: () => Session.get('restaurantOffers'),
});
