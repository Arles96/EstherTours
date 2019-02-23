import './cardFleetRenter.html';
import { unpackageRenter } from '../../../startup/client/packageFunction';
import RenterImages from '../../../api/renters/fleetRenterImage';

Template.cardFleetRenter.events({
  'click #packageRemoveFleetRenter': function () {
    unpackageRenter();
  }
});

Template.cardFleetRenter.helpers({
  findImg (_id) {
    return RenterImages.findOne({ _id });
  },
  first (index) {
    return index === 0;
  }
});
