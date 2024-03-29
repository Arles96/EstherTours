import './showInfoHotel.html';
import '../../components/addRoomHotel/addRoomHotel';
import '../../components/addRateHotel/addRateHotel';
import '../../components/infoRoomHotel/infoRoomHotel';
import '../../components/infoRateHotel/infoRateHotel';
import '../../components/showRating/showRating';
import './editRateHotel';
import './editRoomHotel';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { RoomHotel } from '../../../api/hotels/roomhotel';
import { RateHotel } from '../../../api/hotels/ratehotel';
import { Hotels } from '../../../api/hotels/hotels';
import HotelImage from '../../../api/hotels/hotelImage';
import { packageHotel, unpackageHotel } from '../../../startup/client/packageFunction';

Template.showInfoHotel.onCreated(() => {
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

Template.showInfoHotel.helpers({
  findImage: _id => HotelImage.findOne({ _id }),
  textCategorization: function (text) {
    Session.set('showHotelRating', text);
    return 'Categorización';
  },
  selector: function () {
    return { idHotel: Session.get('idHotel') };
  },
  branchSelector: function (_id) {
    return { mainOffice: _id, branchOffice: true };
  },
  showBranches: function (isOperator) {
    if (!isOperator || this.hotel.branchOffice) {
      return false;
    }
    return true;
  },
  getMainOffice: function (_id) {
    return Hotels.findOne({ _id }).name;
  },
  getBranchOffices: function (_id) {
    return Hotels.find({ mainOffice: _id, branchOffice: true }).map(doc => doc.name);
  },
  urlTag: url => {
    if (url.includes('http://') || url.includes('https://')) {
      return url;
    }
    return `https://${url}`;
  }
});

Template.showButtonRoomHotel.events({
  'click .deleteRoomHotel': function () {
    const id = this._id;
    Swal({
      title: 'Eliminar Habitación',
      text: 'Esta seguro de eliminar este registro.',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true
    }).then(res => {
      if (res.value) {
        Meteor.call('deleteRoomHotel', id, (error, result) => {
          if (error) {
            toastr.error('Error al eliminar el registro.');
          } else {
            toastr.success('Se eliminó el registro exitósamente.');
          }
        });
      }
    });
  },
  'click .infoRoomHotel': function () {
    Session.set('roomHotel', RoomHotel.findOne({ _id: this._id }));
  },
  'click .packageEntity': function () {
    const { _id, idHotel } = RoomHotel.findOne({ _id: this._id });
    packageHotel(idHotel, _id);
    toastr.success('Se ha empaquetado la habitación exitosamente');
  },
  'click .unPackageEntity': function () {
    unpackageHotel();
    toastr.info('Se ha desempaquetado la habitación exitosamente');
  }
});

Template.showButtonRateHotel.events({
  'click .deleteRateHotel': function () {
    const id = this._id;
    Swal({
      title: 'Eliminar Tarifa',
      text: 'Esta seguro de eliminar este registro.',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true
    }).then(res => {
      if (res.value) {
        Meteor.call('deleteRateHotel', id, (error, result) => {
          if (error) {
            toastr.error('Error al eliminar el registro.');
          } else {
            toastr.success('Se eliminó el registro exitósamente.');
          }
        });
      }
    });
  },
  'click .infoRateHotel': function () {
    Session.set('rateHotel', RateHotel.findOne({ _id: this._id }));
  }
});

Template.showButtonBranchHotel.events({
  'click .deleteHotel': function () {
    const id = this._id;
    const hotel = Hotels.findOne({ _id: id });
    Swal({
      title: 'Eliminar sucursal de Hotel',
      text: `Esta seguro de eliminar este registro de ${hotel.name}`,
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true
    }).then(res => {
      if (res.value) {
        Meteor.call('deleteHotel', id, (error, result) => {
          if (error) {
            toastr.error('Error al eliminar el registro.');
          } else {
            toastr.success('Se ha eliminado el registro.');
          }
        });
      }
    });
  }
});
