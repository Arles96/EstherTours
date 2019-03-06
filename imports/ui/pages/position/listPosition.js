import './listPosition.html';
import { Meteor } from 'meteor/meteor';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { PositionSchema, Position } from '../../../api/position/position';

Template.listPosition.onCreated(() => {
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

Template.listPosition.helpers({
  positionId: () => Session.get('positionId')
});

Template.positionModal.onDestroyed(() => {
  Session.set('positionId', undefined);
});

Template.positionModal.helpers({
  PositionSchema: () => PositionSchema,
  position: _id => Position.findOne({ _id })
});

AutoForm.addHooks('updatePositionForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado el registro exitosamente.');
    $('#PositionModal').modal('hide');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});

AutoForm.addHooks('AddPositionForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha creado el registro exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});

Template.showButtonPosition.events({
  'click .updatePosition': function () {
    Session.set('positionId', this._id);
  },
  'click .deletePosition': function () {
    const { _id } = this;
    Meteor.call('removePosition', _id, (error, result) => {
      if (error) {
        toastr.error(error.error);
      } else {
        toastr.success('Se ha eliminado el registro exitosamente.');
      }
    });
  }
});
