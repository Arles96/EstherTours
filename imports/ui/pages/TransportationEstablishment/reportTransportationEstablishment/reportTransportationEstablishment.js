import { Template } from 'meteor/templating';
import Chart from 'chart.js';
import toastr from 'toastr';
import './reportTransportationEstablishment.html';

Template.reportTransportationEstablishments.helpers({
  currentYear: function () {
    const date = new Date();
    return date.getFullYear();
  }
});

Template.reportTransportationEstablishments.events({
  'input .custom-range [type=range]' (event) {
    console.log('heeeeey');
    draw(this.currentYear);
  }
});

Template.reportTransportationEstablishments.onRendered(() => {
  const date = new Date();
  draw(date.getFullYear());
});

function draw (selectedYear) {
  const ctx = document.getElementById('reportChart');
  Meteor.call('reportTransportationEstablishment', { year: selectedYear }, (error, result) => {
    if (error) {
      toastr.error('Error al procesar el reporte.');
    } else {
      /* eslint-disable */
      const myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          datasets: [{
            label: `Creación de trasportes del ${this.currentYear}`,
            data: result,
            backgroundColor: [
              '#34495E',
              '#98A4A4',
              '#5CACE1',
              '#47C9AF',
              '#16A086',
              '#AE7AC4',
              '#8D44AD',
              '#F1C40F',
              '#F39C11',
              '#D25400',
              '#E84C3D',
              '#C1372A'
            ]
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
  });
}

/**
 * #5CACE1
 * #AE7AC4
 * #34495E
 * #16A086
 * #F1C40F
 * #EB974E
 * #E84C3D
 * #F39C11
 * #98A4A4
 * #8D44AD
 * #8D44AD
 * #C1372A
 */


/*
const id = this._id;
    const TransportationEstablishment = TransportationEstablishments.findOne({ _id: id });
    Swal({
      title: 'Eliminar Registro de Transporte',
      text: `Esta seguro de eliminar este registro de ${TransportationEstablishment.name}`,
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true
    }).then(res => {
      if (res.value) {
        Meteor.call('deleteTransportationEstablishment', id, (error, result) => {
          if (error) {
            toastr.error('Error al eliminar el registro.');
          } else {
            toastr.success('Se ha eliminado el registro.');
          }
        });
      }
    });
 */
