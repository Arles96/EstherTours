import './dashboardNavbar.html';
import '../namePackageModal/namePackageModal';
import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import $ from 'jquery';

Template.dashboardNavbar.onCreated(() => {
  Session.set('isCreatePackage', localStorage.getItem('createPackage'));
  Session.set('packageAttraction', localStorage.getItem('packageAttraction'));
  Session.set('packageRoomHotel', localStorage.getItem('packageRoomHotel'));
  Session.set('packageHotel', localStorage.getItem('packageHotel'));
  Session.set('packageFleetRenter', localStorage.getItem('packageFleetRenter'));
  Session.set('packageRenter', localStorage.getItem('packageRenter'));
  Session.set('packageRestaurant', localStorage.getItem('packageRestaurant'));
  Session.set('packageRouteTransport', localStorage.getItem('packageRouteTransport'));
  Session.set('packageTransport', localStorage.getItem('packageTransport'));
});

Template.dashboardNavbar.events({
  'click #logout': function () {
    Accounts.logout();
    window.location = '/';
  },
  'click #createPackage': function () {
    $('#namePackageModal').modal('show');
  },
  'click #deletePackage': function () {
    localStorage.setItem('createPackage', false);
    localStorage.setItem('namePackage', undefined);
    Session.set('isCreatePackage', false);
  }
});
