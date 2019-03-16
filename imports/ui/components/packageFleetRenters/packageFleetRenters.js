import './packageFleetRenters.html';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import toastr from 'toastr';
import { FleetRenter } from '../../../api/renters/fleetRenter';
import { Renters } from '../../../api/renters/renters';
import departments from '../../../api/departments/departments';
import municipalities from '../../../api/municipalities/municipality';
import RenterImages from '../../../api/renters/fleetRenterImage';

Template.packageFleetRenters.onCreated(function createVars () {
  this.tarifaMax = new ReactiveVar(10000);
  this.total = new ReactiveVar(500);
  this.type = new ReactiveVar('');
  this.name = new ReactiveVar('');
  this.street = new ReactiveVar('');
  this.city = new ReactiveVar('');
  this.department = new ReactiveVar('');
  this.municipality = new ReactiveVar('');
  Session.set('packageFleetRenterStars', undefined);
});

Template.packageFleetRenters.helpers({
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

    const queryR = {};

    if (Session.get('packageFleetRenterStars')) {
      queryR.categorization = Session.get('packageFleetRenterStars');
    }

    if (name) {
      queryR.name = new RegExp(`.*${name}.*`, 'i');
    }

    if (street) {
      queryR.street = new RegExp(`.*${street}.*`, 'i');
    }

    if (city) {
      queryR.city = new RegExp(`.*${city}.*`, 'i');
    }

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
      total: {
        $lte: parseInt(total, 10)
      },
      rate: {
        $lte: parseInt(tarifaMax, 10)
      }
    };

    if (type) {
      query.type = new RegExp(`.*${type}.*`, 'i');
    }

    // unir documentos del documento con las flotas encontrados
    const filteredFleets = FleetRenter
      .find(query)
      .map(doc => ({ ...filteredRenters.find(({ _id }) => doc.idRenter === _id), ...doc }));

    return filteredFleets;
  }
});

Template.packageFleetRenters.events({
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

Template.packageResultFleetRenter.helpers({
  selected (id) {
    return id === Session.get('packageFleetId');
  },
  findImg (_id) {
    return RenterImages.findOne({ _id });
  },
  first (index) {
    return index === 0;
  }
});

Template.packageResultFleetRenter.events({
  'click #packageAddFleet' () {
    Session.set('packageRenterId', this.idRenter);
    Session.set('packageFleetId', this._id);
    toastr.info('Se guardo la flota al paquete!');
  },
  'click #packageRemoveFleet' () {
    Session.set('packageRenterId', null);
    Session.set('packageFleetId', null);
    toastr.info('Se quito la flota del paquete!');
  }
});

Template.packageStarFleetRenter.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('packageFleetRenterStars'), 10)) {
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

Template.packageStarFleetRenter.events({
  'click #star1': function () {
    Session.set('packageFleetRenterStars', '1');
  },
  'click #star2': function () {
    Session.set('packageFleetRenterStars', '2');
  },
  'click #star3': function () {
    Session.set('packageFleetRenterStars', '3');
  },
  'click #star4': function () {
    Session.set('packageFleetRenterStars', '4');
  },
  'click #star5': function () {
    Session.set('packageFleetRenterStars', '5');
  }
});
