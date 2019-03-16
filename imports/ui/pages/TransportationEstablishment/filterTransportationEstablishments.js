import './filterTransportationEstablishments.html';
import Swal from 'sweetalert2';
import XLSX from 'xlsx';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { TransportationEstablishments } from '../../../api/TransportationEstablishment/TransportationEstablishment';
import departments from '../../../api/departments/departments';
import municipalities from '../../../api/municipalities/municipality';

Template.filterTE.onCreated(function createVars () {
  this.name = new ReactiveVar('');
  this.street = new ReactiveVar('');
  this.city = new ReactiveVar('');
  this.department = new ReactiveVar('');
  this.municipality = new ReactiveVar('');
  Session.set('filterHotelStars', undefined);
});

Template.filterTE.helpers({
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
    const name = Template.instance().name.get();
    const street = Template.instance().street.get();
    const city = Template.instance().city.get();
    const department = Template.instance().department.get();
    const municipality = Template.instance().municipality.get();

    const query = {};

    if (Session.get('filterHotelStars')) {
      query.categorization = Session.get('filterHotelStars');
    }

    if (name) {
      query.name = new RegExp(`.*${name}.*`, 'i');
    }

    if (street) {
      query.street = new RegExp(`.*${street}.*`, 'i');
    }

    if (city) {
      query.city = new RegExp(`.*${city}.*`, 'i');
    }

    if (department) {
      query.department = department;
    }

    if (municipality) {
      query.town = municipality;
    }

    return TransportationEstablishments
      .find(query)
      .map(doc => doc);
  }
});

Template.filterTE.events({
  'input #name' (event, templateInstance) {
    templateInstance.name.set(event.currentTarget.value);
  },
  'input #street' (event, templateInstance) {
    templateInstance.street.set(event.currentTarget.value);
  },
  'input #city' (event, templateInstance) {
    templateInstance.city.set(event.currentTarget.value);
  },
  'change #department' (event, templateInstance) {
    templateInstance.department.set(event.currentTarget.value);
    templateInstance.municipality.set('');
  },
  'change #municipality' (event, templateInstance) {
    templateInstance.municipality.set(event.currentTarget.value);
  },
  'click #export-filtered' (event, templateInstance) {
    Swal({
      title: 'Exportar datos a Excel',
      text: '¿Está seguro de exportar los establecimientos de transporte a Excel?',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then(res => {
      if (res.value) {
        const name = templateInstance.name.get();
        const street = templateInstance.street.get();
        const city = templateInstance.city.get();
        const department = templateInstance.department.get();
        const municipality = templateInstance.municipality.get();
        const query = {};

        if (Session.get('filterHotelStars')) {
          query.categorization = Session.get('filterHotelStars');
        }
        if (name) {
          query.name = new RegExp(`.*${name}.*`, 'i');
        }
        if (street) {
          query.street = new RegExp(`.*${street}.*`, 'i');
        }
        if (city) {
          query.city = new RegExp(`.*${city}.*`, 'i');
        }
        if (department) {
          query.department = department;
        }
        if (municipality) {
          query.town = municipality;
        }

        Meteor.call('exportTransportsToExcel', query, (error, result) => {
          if (error) {
            toastr.error('Error al exportar a Excel.');
          } else {
            const date = new Date();
            const filename = `Transporte ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getMinutes()}:${date.getSeconds()}.xlsx`;
            XLSX.writeFile(result, filename);
            toastr.success('Se ha exportado a Excel exitosamente.');
          }
        });
      }
    });
  }
});

Template.filterResultTE.helpers({
  urlTag (url) {
    if (url.includes('http://') || url.includes('https://')) {
      return url;
    }
    return `https://${url}`;
  },
  first (index) {
    return index === 0;
  }
});

Template.filterResultTE.events({
  'click #export-single' () {
    Swal({
      title: 'Exportar datos a Excel',
      text: '¿Está seguro de exportar los establecimientos de transporte a Excel?',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then(res => {
      if (res.value) {
        const query = { _id: this._id };
        Meteor.call('exportTransportsToExcel', query, (error, result) => {
          if (error) {
            toastr.error('Error al exportar a Excel.');
          } else {
            const date = new Date();
            const filename = `Transporte ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getMinutes()}:${date.getSeconds()}.xlsx`;
            XLSX.writeFile(result, filename);
            toastr.success('Se ha exportado a Excel exitosamente.');
          }
        });
      }
    });
  }
});

Template.filterStarTE.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('filterHotelStars'), 10)) {
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

Template.filterStarTE.events({
  'click #star1': function () {
    Session.set('filterHotelStars', '1');
  },
  'click #star2': function () {
    Session.set('filterHotelStars', '2');
  },
  'click #star3': function () {
    Session.set('filterHotelStars', '3');
  },
  'click #star4': function () {
    Session.set('filterHotelStars', '4');
  },
  'click #star5': function () {
    Session.set('filterHotelStars', '5');
  }
});
