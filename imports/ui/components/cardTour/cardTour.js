import './cardTour.html';
import { unpackageTour } from '../../../startup/client/packageFunction';

Template.cardTour.helpers({
  first (index) {
    return index === 0;
  }
});

Template.cardTour.events({
  'click #packageRemoveTour': function () {
    unpackageTour();
  }
});
