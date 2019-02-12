import './filterAttractions.html';
import { ReactiveVar } from 'meteor/reactive-var';
import { Attractions } from '../../../api/attractions/attractions';
import AttractionImages from '../../../api/attractions/attractionImage';

// TODO mostrar por paginas

Template.filterAttractions.onCreated(function createVars () {
  this.precioMax = new ReactiveVar(0);
});

Template.filterAttractions.helpers({
  precioMax () {
    return Template.instance().precioMax.get();
  },
  buscar () {
    const precioMax = Template.instance().precioMax.get();
    return Attractions
      .find({ price: { $lt: parseInt(precioMax, 10) } }, { sort: { price: 1 } })
      .map(doc => doc);
  }
});

Template.filterAttractions.events({
  'change #sliderMax' (event, templateInstance) {
    templateInstance.precioMax.set(event.currentTarget.value);
  }
});

Template.filterAttractions.onCreated(function createVars () {
  this.precioMax = new ReactiveVar(0);
});

Template.filterResult.helpers({
  findImg (_id) {
    return AttractionImages.find({ _id }).map(doc => doc)[0];
  },
  first (index) {
    return index === 0;
  }
});
