
import './infoFleetTransportationEstablishment.html';
import { Session } from 'meteor/session';

Template.infoFleetTransportationEstablishment.helpers({
  fleetTransportationEstablishment: () => Session.get('fleetTransportationEstablishment')
});
