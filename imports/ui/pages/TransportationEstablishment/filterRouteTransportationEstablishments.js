import './filterRouteTransportationEstablishments.html';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { RouteTransportationEstablishment } from '../../../api/TransportationEstablishment/RouteTransportationEstablishment';
import { TransportationEstablishments } from '../../../api/TransportationEstablishment/TransportationEstablishment';
import departments from '../../../api/departments/departments';
import municipalities from '../../../api/municipalities/municipality';

// TODO mostrar por paginas

Template.filterRouteTE.onCreated(function createVars () {
  this.type = new ReactiveVar('');
  this.name = new ReactiveVar('');
  this.street = new ReactiveVar('');
  this.city = new ReactiveVar('');
  this.department = new ReactiveVar('');
  this.municipality = new ReactiveVar('');
  Session.set('filterRouteTEStars', '5');
});

Template.filterRouteTE.helpers({
  type () {
    return Template.instance().type.get();
  },
  name () {
    return Template.instance().name.get();
  },
  street () {
    return Template.instance().street.get();
  },
  city () {
    return Template.instance().city.get();
  },
  department () {
    return Template.instance().department.get();
  },
  municipality () {
    return Template.instance().municipality.get();
  },
  listDepartment () {
    return departments;
  },
  listMunicipality () {
    const department = Template.instance().department.get();
    return municipalities[department];
  },
  deptSelected () {
    const department = Template.instance().department.get();
    return department !== '';
  },
  buscar () {
    // filtrar por establecimiento de transporte primero
    const type = Template.instance().type.get();
    const name = Template.instance().name.get();
    const street = Template.instance().street.get();
    const city = Template.instance().city.get();
    const department = Template.instance().department.get();
    const municipality = Template.instance().municipality.get();

    const queryR = {
      name: new RegExp(`.*${name}.*`, 'i'),
      categorization: {
        $lte: Session.get('filterRouteTEStars')
      }
    };

    const filteredTE = TransportationEstablishments
      .find(queryR)
      .map(doc => doc);

    // con los establecimientos obtenidos, filtrar por ruta
    const query = {
      idTransportationEstablishment: {
        $in: filteredTE.map(doc => doc._id)
      },
      street: new RegExp(`.*${street}.*`, 'i'),
      city: new RegExp(`.*${city}.*`, 'i'),
      type: new RegExp(`.*${type}.*`, 'i')
    };

    if (department) {
      query.department = department;
    }

    if (municipality) {
      query.town = municipality;
    }

    // unir documentos del documento con las rutas encontradas
    const filteredRoutes = RouteTransportationEstablishment
      .find(query)
      .map(doc => ({
        ...filteredTE.find(({ _id }) => doc.idTransportationEstablishment === _id),
        ...doc
      }));

    return filteredRoutes;
  }
});

Template.filterRouteTE.events({
  'input #sliderMaxRate' (event, templateInstance) {
    templateInstance.tarifaMax.set(event.currentTarget.value);
  },
  'input #sliderMaxTotal' (event, templateInstance) {
    templateInstance.total.set(event.currentTarget.value);
  },
  'input #name' (event, templateInstance) {
    templateInstance.name.set(event.currentTarget.value);
  },
  'input #street' (event, templateInstance) {
    templateInstance.street.set(event.currentTarget.value);
  },
  'input #city' (event, templateInstance) {
    templateInstance.city.set(event.currentTarget.value);
  },
  'change #type' (event, templateInstance) {
    templateInstance.type.set(event.currentTarget.value);
  },
  'change #department' (event, templateInstance) {
    templateInstance.department.set(event.currentTarget.value);
    templateInstance.municipality.set('');
  },
  'change #municipality' (event, templateInstance) {
    templateInstance.municipality.set(event.currentTarget.value);
  }
});

Template.filterResultRouteTE.helpers({
  first (index) {
    return index === 0;
  }
});

Template.filterStarRouteTE.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('filterRouteTEStars'), 10)) {
        list.push({
          class: 'fas fa-star colorOrange',
          id: `star${index}`
        });
      } else {
        list.push({
          class: 'fas fa-star',
          id: `star${index}`
        });
      }
    }
    return list;
  }
});

Template.filterStarRouteTE.events({
  'click #star1': function () {
    Session.set('filterRouteTEStars', '1');
  },
  'click #star2': function () {
    Session.set('filterRouteTEStars', '2');
  },
  'click #star3': function () {
    Session.set('filterRouteTEStars', '3');
  },
  'click #star4': function () {
    Session.set('filterRouteTEStars', '4');
  },
  'click #star5': function () {
    Session.set('filterRouteTEStars', '5');
  }
});
