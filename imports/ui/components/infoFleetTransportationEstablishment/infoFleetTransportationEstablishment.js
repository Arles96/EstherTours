
import './infoFleetTransportationEstablishment.html';
import { Session } from 'meteor/session';

Template.infoFleetTransportationEstablishment.helpers({
  fleetTransportationEstablishment: () => {
    console.log(Session.get('fleetTransportationEstablishment'));
    return Session.get('fleetTransportationEstablishment');
  }
});
