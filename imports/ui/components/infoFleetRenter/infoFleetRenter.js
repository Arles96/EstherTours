import './infoFleetRenter.html';
import { Session } from 'meteor/session';

Template.infoFleetRenter.helpers({
  fleetRenter: () => Session.get('fleetRenter')
});
