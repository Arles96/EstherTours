import './filterAttractions.html';
import Swal from 'sweetalert2';
import XLSX from 'xlsx';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Attractions } from '../../../api/attractions/attractions';
import departments from '../../../api/departments/departments';
import municipalities from '../../../api/municipalities/municipality';
import AttractionImages from '../../../api/attractions/attractionImage';

Template.filterAttractions.onCreated(function createVars () {
  this.precioMax = new ReactiveVar(2500);
  this.name = new ReactiveVar('');
  this.street = new ReactiveVar('');
  this.city = new ReactiveVar('');
  this.department = new ReactiveVar('');
  this.municipality = new ReactiveVar('');
  Session.set('filterAttractionStars', '');
});

Template.filterAttractions.helpers({
  precioMax () {
    return Template.instance().precioMax.get();
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
    const precioMax = Template.instance().precioMax.get();
    const name = Template.instance().name.get();
    const street = Template.instance().street.get();
    const city = Template.instance().city.get();
    const department = Template.instance().department.get();
    const municipality = Template.instance().municipality.get();
    const query = {};
    if (name) {
      query.name = new RegExp(`.*${name}.*`, 'i');
    }
    if (precioMax) {
      query.price = {
        $lt: parseInt(precioMax, 10)
      };
    }
    if (Session.get('filterAttractionStars')) {
      query.categorization = Session.get('filterAttractionStars');
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
    return Attractions
      .find(query, { sort: { price: 1 } })
      .map(doc => doc);
  }
});

Template.filterAttractions.events({
  'input #sliderMax' (event, templateInstance) {
    templateInstance.precioMax.set(event.currentTarget.value);
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
      text: '¿Está seguro de exportar las atracciones a Excel?',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then(res => {
      if (res.value) {
        const precioMax = templateInstance.precioMax.get();
        const name = templateInstance.name.get();
        const street = templateInstance.street.get();
        const city = templateInstance.city.get();
        const department = templateInstance.department.get();
        const municipality = templateInstance.municipality.get();
        const query = {};
        if (name) {
          query.name = new RegExp(`.*${name}.*`, 'i');
        }
        if (precioMax) {
          query.price = {
            $lt: parseInt(precioMax, 10)
          };
        }
        if (Session.get('filterAttractionStars')) {
          query.categorization = Session.get('filterAttractionStars');
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
            const filename = `Atracciones ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getMinutes()}:${date.getSeconds()}.xlsx`;
            XLSX.writeFile(result, filename);
            toastr.success('Se ha exportado a Excel exitosamente.');
          }
        });
      }
    });
  }
});

Template.filterResult.helpers({
  findImg (_id) {
    return AttractionImages.find({ _id }).map(doc => doc)[0];
  },
  first (index) {
    return index === 0;
  }
});

Template.filterStarAttraction.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('filterAttractionStars'), 10)) {
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

Template.filterStarAttraction.events({
  'click #star1': function () {
    Session.set('filterAttractionStars', '1');
  },
  'click #star2': function () {
    Session.set('filterAttractionStars', '2');
  },
  'click #star3': function () {
    Session.set('filterAttractionStars', '3');
  },
  'click #star4': function () {
    Session.set('filterAttractionStars', '4');
  },
  'click #star5': function () {
    Session.set('filterAttractionStars', '5');
  }
});
