
import './infoRouteTransportationEstablishment.html';
import { Session } from 'meteor/session';

Template.infoRouteTransportationEstablishment.helpers({
  routeTransportationEstablishment: () => Session.get('routeTransportationEstablishment')
});
