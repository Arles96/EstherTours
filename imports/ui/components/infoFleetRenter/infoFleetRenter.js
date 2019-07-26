import './infoFleetRenter.html';
import '../toDecimal/toDecimal';
import { Session } from 'meteor/session';
import { FleetRenter } from '../../../api/renters/fleetRenter';
import FleetRenterImage from '../../../api/renters/fleetRenterImage';

Template.infoFleetRenter.helpers({
  fleetRenter: () => FleetRenter.findOne({ _id: Session.get('fleetRenter') }),
  FindImage: _id => FleetRenterImage.findOne({ _id })
});
