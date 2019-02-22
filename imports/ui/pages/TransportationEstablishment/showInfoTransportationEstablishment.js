import './showInfoTransportationEstablishment.html';
import '../../components/addBranchOfficeTransportationEstablishment/addBranchOfficeTransportationEstablishment';
import '../../components/addFleetTransportationEstablishment/addFleetTransportationEstablishment';
import '../../components/infoFleetTransportationEstablishment/infoFleetTransportationEstablishment';
import './editFleetTransportationEstablishment';
import '../../components/addRouteTransportationEstablishment/addRouteTransportationEstablishment';
import '../../components/infoRouteTransportationEstablishment/infoRouteTransportationEstablishment';
import './editRouteTransportationEstablishment';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { TransportationEstablishments } from '../../../api/TransportationEstablishment/TransportationEstablishment';
import { FleetTransportationEstablishment } from '../../../api/TransportationEstablishment/FleetTransportationEstablishment';
import { RouteTransportationEstablishment } from '../../../api/TransportationEstablishment/RouteTransportationEstablishment';

Template.showInfoTransportationEstablishment.onCreated(() => {
  $.extend(true, $.fn.dataTable.defaults, {
    language: {
      sLengthMenu: 'Mostrar _MENU_ registros',
      sProcessing: 'Procesando ...',
      sZeroRecords: 'No se encontraron resultados',
      sEmptyTable: 'Nigún dato disponible ',
      sInfo: 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
      sInfoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
      sInfoFiltered: '(filtrado de un total de _MAX_ registros)',
      sInfoPostFix: ' ',
      sSearch: 'Buscar:',
      sUrl: '',
      sInfoThousands: ',',
      sLoadingRecords: 'Cargando...',
      oPaginate: {
        sFirst: 'Primero',
        sLast: 'Último',
        sNext: 'Siguiente',
        sPrevious: 'Anterior'
      },
      oAria: {
        sSortAscending: ': Activar para ordenar la columna de manera ascendente',
        sSortDescending: ': Activar para ordenar la columna de manera descendente'
      }
    }
  });
});

Template.showInfoTransportationEstablishment.helpers({
  selector: function () {
    return { idTransportationEstablishment: Session.get('idTransportationEstablishment') };
  },
  urlTag: url => {
    if (url.includes('http://') || url.includes('https://')) {
      return url;
    }
    return `https://${url}`;
  },
  isBranch: function (branchOffice) {
    return !branchOffice;
  },
  textCategorization: function (text) {
    Session.set('showTransportationRating', text);
    return 'Categorización';
  }
});

Template.showButtonBranchOfficeTransportationEstablishments.events({
  'click .addFleetTransportationEstablishment': function () {
    Session.set('idTransportationEstablishment', this._id);
  },
  'click .addRouteTransportationEstablishment': function () {
    Session.set('idTransportationEstablishment', this._id);
  },
  'click .deleteTransportationEstablishment': function () {
    const id = this._id;
    const TransportationEstablishment = TransportationEstablishments.findOne({ _id: id });
    Swal({
      title: 'Eliminar sucursal de transporte',
      text: `Esta seguro de eliminar esta sucursal de ${TransportationEstablishment.name}`,
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true
    }).then(res => {
      if (res.value) {
        Meteor.call('deleteTransportationEstablishment', id, (error, result) => {
          if (error) {
            toastr.error('Error al eliminar la sucursal.');
          } else {
            toastr.success('Se ha eliminado la sucursal.');
          }
        });
      }
    });
  }
});

Template.showButtonFleetTransportationEstablishments.events({
  'click .deleteFleetTransportationEstablishment': function () {
    const id = this._id;
    Swal({
      title: 'Eliminar Flota',
      text: 'Esta seguro de eliminar este registro.',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true
    }).then(res => {
      if (res.value) {
        Meteor.call('deleteFleetTransportationEstablishment', id, (error, result) => {
          if (error) {
            toastr.error('Error al eliminar el registro.');
          } else {
            toastr.success('Se eliminó el registro exitosamente.');
          }
        });
      }
    });
  },
  'click .infoFleetTransportationEstablishment': function () {
    Session.set('fleetTransportationEstablishment', FleetTransportationEstablishment.findOne({ _id: this._id }));
  }
});

Template.showButtonRouteTransportationEstablishments.events({
  'click .deleteRouteTransportationEstablishment': function () {
    const id = this._id;
    Swal({
      title: 'Eliminar Flota',
      text: 'Esta seguro de eliminar este registro.',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then(res => {
      if (res.value) {
        Meteor.call('deleteRouteTransportationEstablishment', id, (error, result) => {
          if (error) {
            toastr.error('Error al eliminar el registro.');
          } else {
            toastr.success('Se eliminó el registro exitosamente.');
          }
        });
      }
    });
  },
  'click .infoRouteTransportationEstablishment': function () {
    Session.set('routeTransportationEstablishment', RouteTransportationEstablishment.findOne({ _id: this._id }));
  }
});

Template.showStarTransportation.helpers({
  list: rating => {
    const list = [];
    console.log(rating);
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(rating, 10)) {
        list.push({
          class: 'fas fa-star colorOrange',
          id: `start${index}`
        });
      } else {
        list.push({
          class: 'fas fa-star',
          id: `start${index}`
        });
      }
    }
    console.log(list);
    return list;
  }
});
