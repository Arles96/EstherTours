import './infoFleetRenter.html';
import '../toDecimal/toDecimal';
import { Session } from 'meteor/session';
import FleetRenterImage from '../../../api/renters/fleetRenterImage';

Template.infoFleetRenter.helpers({
  fleetRenter: () => Session.get('fleetRenter'),
  FindImage: _id => FleetRenterImage.findOne({ _id })
});
