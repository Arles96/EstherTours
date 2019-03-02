import './cardRouteTransport.html';
import { unpackageTransport } from '../../../startup/client/packageFunction';

Template.cardRouteTransport.events({
  'click #unPackageAddRoute': function () {
    unpackageTransport();
  }
});

Template.cardRouteTransport.helpers({
  first (index) {
    return index === 0;
  }
});
