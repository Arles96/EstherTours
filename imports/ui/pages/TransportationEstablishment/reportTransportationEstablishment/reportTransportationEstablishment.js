import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import Chart from 'chart.js';
import toastr from 'toastr';
import './reportTransportationEstablishment.html';

Template.reportTransportationEstablishments.onCreated(function createVars () {
  const date = new Date();
  this.maxYear = new ReactiveVar(date.getFullYear());
  this.currentYear = new ReactiveVar(date.getFullYear());
  this.myChart = new ReactiveVar('');
});

Template.reportTransportationEstablishments.helpers({
  currentYear () {
    return Template.instance().currentYear.get();
  },
  maxYear () {
    return Template.instance().maxYear.get();
  }
});

Template.reportTransportationEstablishments.events({
  'input #rangeControl' (event, templateInstance) {
    console.log(event.currentTarget.value);
    templateInstance.currentYear.set(event.currentTarget.value);
    draw(event.currentTarget.value, templateInstance);
  }
});

Template.reportTransportationEstablishments.onRendered(() => {
  const date = new Date();
  draw(date.getFullYear(), null);
});

function draw (selectedYear, templateInstance) {
  const ctx = document.getElementById('reportChart');
  Meteor.call('reportTransportationEstablishment', { year: selectedYear }, (error, result) => {
    if (error) {
      toastr.error('Error al procesar el reporte.');
    } else if (templateInstance !== null) {
      /* eslint-disable */
      templateInstance.myChart.set(new Chart(ctx, {
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
      }));
    } else {
      this.myChart = new ReactiveVar(new Chart(ctx, {
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
      }));
    }
  });
}
