import './initialDashboard.html';
import '../../components/breadcrumb/breadcrumb';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import Chart from 'chart.js';
import toastr from 'toastr';
import { Notifications } from '../../../api/Notifications/Notification';
import { userActivities } from '../../../api/userActivities/userActivities';

const moment = require('moment');

require('moment/min/locales.min');

Template.initialDashboard.onCreated(function createVars () {
  const date = new Date();
  this.maxYear = new ReactiveVar(date.getFullYear());
  this.currentYear_hotel = new ReactiveVar(date.getFullYear());
  this.currentYear_restaurant = new ReactiveVar(date.getFullYear());
  this.currentYear_attraction = new ReactiveVar(date.getFullYear());
  this.currentYear_renter = new ReactiveVar(date.getFullYear());
  this.currentYear_transport = new ReactiveVar(date.getFullYear());
  this.currentYear_package = new ReactiveVar(date.getFullYear());
  this.hotelChart = new ReactiveVar('none');
  this.restaurantChart = new ReactiveVar('none');
  this.attractionChart = new ReactiveVar('none');
  this.renterChart = new ReactiveVar('none');
  this.transportChart = new ReactiveVar('none');
  this.packageChart = new ReactiveVar('none');
  this.personalActivitiesCount = new ReactiveVar(0);
});

Template.initialDashboard.onRendered(() => {
  const date = new Date();
  draw(date.getFullYear(), Template.instance().hotelChart, 'hotel', 'hoteles', 'reportHotels', Template.instance().currentYear_hotel.get());
  draw(date.getFullYear(), Template.instance().restaurantChart, 'restaurant', 'restaurantes', 'reportRestaurants', Template.instance().currentYear_restaurant.get());
  draw(date.getFullYear(), Template.instance().attractionChart, 'attraction', 'atracciones', 'reportAttractions', Template.instance().currentYear_attraction.get());
  draw(date.getFullYear(), Template.instance().renterChart, 'renter', 'arrendadoras', 'reportRenters', Template.instance().currentYear_renter.get());
  draw(date.getFullYear(), Template.instance().transportChart, 'transport', 'transportes', 'reportTransportationEstablishment', Template.instance().currentYear_transport.get());
  draw(date.getFullYear(), Template.instance().packageChart, 'package', 'paquetes', 'reportSoldPackages', Template.instance().currentYear_package.get());
});

Template.initialDashboard.helpers({
  currentYear: id => {
    switch (id) {
      case 'hotel':
        return Template.instance().currentYear_hotel.get();
      case 'restaurant':
        return Template.instance().currentYear_restaurant.get();
      case 'attraction':
        return Template.instance().currentYear_attraction.get();
      case 'renter':
        return Template.instance().currentYear_renter.get();
      case 'transport':
        return Template.instance().currentYear_transport.get();
      case 'package':
        return Template.instance().currentYear_package.get();
      default: return null;
    }
  },
  maxYear: () => Template.instance().maxYear.get(),
  CantNotifications: () => Notifications.find({ idReceiver: Meteor.userId() }).count(),
  CantActivity: () => {
    moment.locale('es');
    const counts = userActivities.find({
      userId: Meteor.userId()
    });
    return counts.count();
  }
});

Template.initialDashboard.events({
  'input #rangeControl-hotel' (event, templateInstance) {
    templateInstance.currentYear_hotel.set(event.currentTarget.value);
    Template.instance().hotelChart.get().destroy();
    draw(event.currentTarget.value, Template.instance().hotelChart, 'hotel', 'hoteles', 'reportHotels', Template.instance().currentYear_hotel.get());
  },
  'input #rangeControl-restaurant' (event, templateInstance) {
    templateInstance.currentYear_restaurant.set(event.currentTarget.value);
    Template.instance().restaurantChart.get().destroy();
    draw(event.currentTarget.value, Template.instance().restaurantChart, 'restaurant', 'restaurantes', 'reportRestaurants', Template.instance().currentYear_restaurant.get());
  },
  'input #rangeControl-attraction' (event, templateInstance) {
    templateInstance.currentYear_attraction.set(event.currentTarget.value);
    Template.instance().attractionChart.get().destroy();
    draw(event.currentTarget.value, Template.instance().attractionChart, 'attraction', 'atracciones', 'reportAttractions', Template.instance().currentYear_attraction.get());
  },
  'input #rangeControl-renter' (event, templateInstance) {
    templateInstance.currentYear_renter.set(event.currentTarget.value);
    Template.instance().renterChart.get().destroy();
    draw(event.currentTarget.value, Template.instance().renterChart, 'renter', 'arrendadoras', 'reportRenters', Template.instance().currentYear_renter.get());
  },
  'input #rangeControl-transport' (event, templateInstance) {
    templateInstance.currentYear_transport.set(event.currentTarget.value);
    Template.instance().transportChart.get().destroy();
    draw(event.currentTarget.value, Template.instance().transportChart, 'transport', 'transportes', 'reportTransportationEstablishment', Template.instance().currentYear_transport.get());
  },
  'input #rangeControl-package' (event, templateInstance) {
    templateInstance.currentYear_package.set(event.currentTarget.value);
    Template.instance().packageChart.get().destroy();
    draw(event.currentTarget.value, Template.instance().packageChart, 'package', 'paquetes', 'reportSoldPackages', Template.instance().currentYear_package.get());
  }
});

function draw (selectedYear, instance, entity, name, meteorMethod, currentYear) {
  const ctx = document.getElementById(`${entity}-reportChart`);
  Meteor.call(meteorMethod, { year: Number(selectedYear) }, (error, result) => {
    if (error) {
      toastr.error('Error al procesar el reporte.');
    } else {
      // Datos del chart
      const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{
          label: `Creación de ${name} del ${currentYear}`,
          data: result,
          backgroundColor: ['#34495E', '#98A4A4', '#5CACE1', '#47C9AF', '#16A086', '#AE7AC4', '#8D44AD', '#F1C40F', '#F39C11', '#D25400', '#E84C3D', '#C1372A']
        }]
      };
      instance.set(new Chart(ctx, {
        type: 'pie',
        data: data
      }));
    }
  });
}
