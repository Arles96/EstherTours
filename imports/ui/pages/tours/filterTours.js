import './filterTours.html';
/* import Swal from 'sweetalert2';
import XLSX from 'xlsx';
import toastr from 'toastr'; */
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tours } from '../../../api/tours/tours';
import departments from '../../../api/departments/departments';
import municipalities from '../../../api/municipalities/municipality';

Template.filterTours.onCreated(function createVars () {
  this.precioMax = new ReactiveVar(2500);
  this.title = new ReactiveVar('');
  this.street = new ReactiveVar('');
  this.city = new ReactiveVar('');
  this.department = new ReactiveVar('');
  this.municipality = new ReactiveVar('');
  Session.set('filterTourStars', '');
});

Template.filterTours.helpers({
  precioMax () {
    return Template.instance().precioMax.get();
  },
  title () {
    return Template.instance().title.get();
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
    const precioMax = Template.instance().precioMax.get();
    const title = Template.instance().title.get();
    const street = Template.instance().street.get();
    const city = Template.instance().city.get();
    const department = Template.instance().department.get();
    const municipality = Template.instance().municipality.get();
    const query = {};
    if (title) {
      query.title = new RegExp(`.*${title}.*`, 'i');
    }
    if (precioMax) {
      query.price = {
        $lt: parseInt(precioMax, 10)
      };
    }
    if (Session.get('filterTourStars')) {
      query.categorization = Session.get('filterTourStars');
    }
    if (department) {
      query.departament = department;
    }
    if (municipality) {
      query.municipality = municipality;
    }
    if (street) {
      query.street = new RegExp(`.*${street}.*`, 'i');
    }
    if (city) {
      query.city = new RegExp(`.*${city}.*`, 'i');
    }
    return Tours
      .find(query, { sort: { price: 1 } })
      .map(doc => doc);
  }
});

Template.filterTours.events({
  'input #sliderMax' (event, templateInstance) {
    templateInstance.precioMax.set(event.currentTarget.value);
  },
  'input #title' (event, templateInstance) {
    templateInstance.title.set(event.currentTarget.value);
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
  }/* ,
  'click #export-filtered' (event, templateInstance) {
    Swal({
      title: 'Exportar datos a Excel',
      text: '¿Está seguro de exportar las atracciones a Excel?',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then(res => {
      if (res.value) {
        const precioMax = templateInstance.precioMax.get();
        const title = templateInstance.title.get();
        const street = templateInstance.street.get();
        const city = templateInstance.city.get();
        const department = templateInstance.department.get();
        const municipality = templateInstance.municipality.get();
        const query = {};
        if (title) {
          query.title = new RegExp(`.*${title}.*`, 'i');
        }
        if (precioMax) {
          query.price = {
            $lt: parseInt(precioMax, 10)
          };
        }
        if (Session.get('filterTourStars')) {
          query.categorization = Session.get('filterTourStars');
        }
        if (department) {
          query.departament = department;
        }
        if (municipality) {
          query.municipality = municipality;
        }
        if (street) {
          query.street = new RegExp(`.*${street}.*`, 'i');
        }
        if (city) {
          query.city = new RegExp(`.*${city}.*`, 'i');
        }
        Meteor.call('exportAttractionsToExcel', query, (error, result) => {
          if (error) {
            toastr.error('Error al exportar a Excel.');
          } else {
            const date = new Date();
            const filetitle = `Atracciones ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getMinutes()}:${date.getSeconds()}.xlsx`;
            XLSX.writeFile(result, filetitle);
            toastr.success('Se ha exportado a Excel exitosamente.');
          }
        });
      }
    });
  } */
});

Template.filterResultTours.helpers({
  first (index) {
    return index === 0;
  }
});

Template.filterStarTours.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('filterTourStars'), 10)) {
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

Template.filterStarTours.events({
  'click #star1': function () {
    Session.set('filterTourStars', '1');
  },
  'click #star2': function () {
    Session.set('filterTourStars', '2');
  },
  'click #star3': function () {
    Session.set('filterTourStars', '3');
  },
  'click #star4': function () {
    Session.set('filterTourStars', '4');
  },
  'click #star5': function () {
    Session.set('filterTourStars', '5');
  }
});
