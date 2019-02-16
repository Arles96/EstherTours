import './filterFleetRenters.html';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { FleetRenter } from '../../../api/renters/fleetRenter';
import { Renters } from '../../../api/renters/renters';
import departments from '../../../api/departments/departments';
import municipalities from '../../../api/municipalities/municipality';
import RenterImages from '../../../api/renters/fleetRenterImage';

// TODO mostrar por paginas

Template.filterFleetRenters.onCreated(function createVars () {
  this.tarifaMax = new ReactiveVar(2500);
  this.total = new ReactiveVar(50);
  this.type = new ReactiveVar('');
  this.name = new ReactiveVar('');
  this.street = new ReactiveVar('');
  this.city = new ReactiveVar('');
  this.department = new ReactiveVar('');
  this.municipality = new ReactiveVar('');
  Session.set('filterFleetRenterStars', '0');
});

Template.filterFleetRenters.helpers({
  tarifaMax () {
    return Template.instance().tarifaMax.get();
  },
  total () {
    return Template.instance().total.get();
  },
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
    // filtrar por arrendadora primero
    const tarifaMax = Template.instance().tarifaMax.get();
    const total = Template.instance().total.get();
    const type = Template.instance().type.get();
    const name = Template.instance().name.get();
    const street = Template.instance().street.get();
    const city = Template.instance().city.get();
    const department = Template.instance().department.get();
    const municipality = Template.instance().municipality.get();

    const queryR = {
      name: new RegExp(`.*${name}.*`, 'i'),
      categorization: {
        $lte: Session.get('filterFleetRenterStars')
      },
      street: new RegExp(`.*${street}.*`, 'i'),
      city: new RegExp(`.*${city}.*`, 'i')
    };

    if (department) {
      queryR.department = department;
    }

    if (municipality) {
      queryR.municipality = municipality;
    }

    const filteredRenters = Renters
      .find(queryR)
      .map(doc => doc);

    // con las arrendadoras obtenidos, filtrar por flota
    const query = {
      idRenter: {
        $in: filteredRenters.map(doc => doc._id)
      },
      type: new RegExp(`.*${type}.*`, 'i'),
      total: {
        $lte: parseInt(total, 10)
      },
      rate: {
        $lte: parseInt(tarifaMax, 10)
      }
    };

    // unir documentos del documento con las flotas encontrados
    const filteredFleets = FleetRenter
      .find(query, { sort: { price: 1 } })
      .map(doc => ({ ...filteredRenters.find(({ _id }) => doc.idRenter === _id), ...doc }));

    return filteredFleets;
  }
});

Template.filterFleetRenters.events({
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

Template.filterResultFleetRenter.helpers({
  findImg (_id) {
    return RenterImages.findOne({ _id });
  },
  first (index) {
    return index === 0;
  }
});

Template.filterStarFleetRenter.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('filterFleetRenterStars'), 10)) {
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

Template.filterStarFleetRenter.events({
  'click #star1': function () {
    Session.set('filterFleetRenterStars', '1');
  },
  'click #star2': function () {
    Session.set('filterFleetRenterStars', '2');
  },
  'click #star3': function () {
    Session.set('filterFleetRenterStars', '3');
  },
  'click #star4': function () {
    Session.set('filterFleetRenterStars', '4');
  },
  'click #star5': function () {
    Session.set('filterFleetRenterStars', '5');
  }
});
