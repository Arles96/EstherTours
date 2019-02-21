import './cardFleetRenter.html';
import { unpackageRenter } from '../../../startup/client/packageFunction';

Template.cardFleetRenter.events({
  'click #packageRemoveFleetRenter': function () {
    unpackageRenter();
  }
});
