import './cardAttraction.html';
import { Template } from 'meteor/templating';
import { unpackageAttraction } from '../../../startup/client/packageFunction';

Template.cardAttraction.events({
  'click #packageRemoveAttraction': function () {
    unpackageAttraction();
  }
});
