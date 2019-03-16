import './filterPackage.html';
import './emailPackage';
import '../../components/sellPackageModal/sellPackageModal';
import Swal from 'sweetalert2';
import XLSX from 'xlsx';
import toastr from 'toastr';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import departments from '../../../api/departments/departments';
import municipalities from '../../../api/municipalities/municipality';

const sliderVals = {
  max: 50000,
  step: 1000
};

Template.filterPackage.onCreated(function createVars () {
  let tempMax = 0;
  Meteor.call('maxValuesPackages', (error, result) => {
    if (!error && result) {
      sliderVals.max = Math.round(result.price * 1.2);
      sliderVals.step = Math.round((result.price * 1.2) / 10);
      tempMax = Math.round(sliderVals.max / 4);
    }
  });

  this.precioMax = new ReactiveVar(tempMax);
  this.name = new ReactiveVar('');
  this.street = new ReactiveVar('');
  this.city = new ReactiveVar('');
  this.department = new ReactiveVar('');
  this.municipality = new ReactiveVar('');
  Session.set('filterPackages', []);
});

Template.filterPackage.helpers({
  sliderVals () {
    return sliderVals;
  },
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
  data () {
    // filtrar por hotel primero
    const precioMax = Template.instance().precioMax.get();
    const name = Template.instance().name.get();
    const street = Template.instance().street.get();
    const city = Template.instance().city.get();
    const department = Template.instance().department.get();
    const municipality = Template.instance().municipality.get();
    const queryE = {};
    const queryP = {};
    if (name) {
      queryP.name = new RegExp(`.*${name}.*`, 'i');
    }
    if (street) {
      queryE.street = new RegExp(`.*${street}.*`, 'i');
    }
    if (city) {
      queryE.city = new RegExp(`.*${city}.*`, 'i');
    }
    if (department) {
      queryE.departament = department;
    }
    if (municipality) {
      queryE.municipality = municipality;
    }
    queryP.price = {
      $lte: parseInt(precioMax, 10)
    };
    Meteor.call('filterPackages', { queryE, queryP }, (error, result) => {
      if (!error) {
        Session.set('filterPackages', result);
      }
    });
    return Session.get('filterPackages');
  }
});

Template.filterPackage.events({
  'click .emailPackage' (event, templateInstance) {
    Session.set('emailPackageId', this._id);
  },
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
      text: '¿Está seguro de exportar los paquetes a Excel?',
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
        const queryE = {};
        const queryP = {};
        if (name) {
          queryP.name = new RegExp(`.*${name}.*`, 'i');
        }
        if (street) {
          queryE.street = new RegExp(`.*${street}.*`, 'i');
        }
        if (city) {
          queryE.city = new RegExp(`.*${city}.*`, 'i');
        }
        if (department) {
          queryE.departament = department;
        }
        if (municipality) {
          queryE.municipality = municipality;
        }
        queryP.price = {
          $lte: parseInt(precioMax, 10)
        };
        Meteor.call('exportFilteredToExcel', { queryE, queryP }, (error, result) => {
          if (error) {
            toastr.error('Error al exportar a Excel.');
          } else {
            const date = new Date();
            const filename = `Paquetes ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getMinutes()}:${date.getSeconds()}.xlsx`;
            XLSX.writeFile(result, filename);
            toastr.success('Se ha exportado a Excel exitosamente.');
          }
        });
      }
    });
  }
});

Template.filterResultPackage.events({
  'click .sellPackage': function () {
    const { _id, name, price } = this;
    Session.set('soldPackagePrice', price);
    Session.set('soldPackageName', name);
    Session.set('soldPackageId', _id);
    $('#sellPackageModal').modal('show');
  },
  'click #export-single': function () {
    Swal({
      title: 'Exportar datos a Excel',
      text: '¿Está seguro de exportar los paquetes a Excel?',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then(res => {
      if (res.value) {
        const query = { _id: this._id };
        Meteor.call('exportToExcel', query, (error, result) => {
          if (error) {
            toastr.error('Error al exportar a Excel.');
          } else {
            const date = new Date();
            const filename = `Paquetes ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getMinutes()}:${date.getSeconds()}.xlsx`;
            XLSX.writeFile(result, filename);
            toastr.success('Se ha exportado a Excel exitosamente.');
          }
        });
      }
    });
  }
});
