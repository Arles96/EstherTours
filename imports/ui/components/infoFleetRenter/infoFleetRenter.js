import './infoFleetRenter.html';
import { Session } from 'meteor/session';

Template.infoFleetRenter.helpers({
  fleetRenter: () => {
    console.log(Session.get('fleetRenter'));
    return Session.get('fleetRenter');
  }
});
