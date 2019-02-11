import './filterAttractions.html';
import { ReactiveVar } from 'meteor/reactive-var';
import { Attractions } from '../../../api/attractions/attractions';
// import AttractionImages from '../../../api/attractions/attractionImage';

Template.filterAttractions.onCreated(function createVars () {
  this.precioMax = new ReactiveVar(100);
});

Template.filterAttractions.helpers({
  precioMax () {
    return Template.instance().precioMax.get();
  },
  buscar () {
    const precioMax = Template.instance().precioMax.get();
    return Attractions.find({ price: { $lt: parseInt(precioMax, 10) } }).map(doc => doc);
  }
});

Template.filterAttractions.events({
  'change #sliderMax' (event, templateInstance) {
    templateInstance.precioMax.set(event.currentTarget.value);
  }
});
