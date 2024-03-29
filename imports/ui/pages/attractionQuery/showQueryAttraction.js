import './showQueryAttraction.html';
import { Session } from 'meteor/session';
import { Guide } from '../../../api/guide/guide';
import '../../components/showRating/showRating';
import '../../components/toDecimal/toDecimal';

Template.showQueryAttraction.onCreated(() => {
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

Template.showQueryAttraction.helpers({
  selector: function () {
    return Session.get('attractionQueryDoc').doc;
  },
  guideInfo: guide => Guide.findOne({ _id: guide }).name
});

Template.showButtonQueryAttractions.events({
  'click .deleteAttraction': function () {
    const id = this._id;
    const attraction = Attractions.findOne({ _id: id });
    Swal({
      title: 'Eliminar Registro de Atracciones',
      text: `Esta seguro de eliminar este registro de ${attraction.name}`,
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then(res => {
      if (res.value) {
        Meteor.call('deleteAttraction', id, (error, result) => {
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
