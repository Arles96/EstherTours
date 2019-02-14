import './dashboardNavbar.html';
import '../namePackageModal/namePackageModal';
import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import $ from 'jquery';

Template.dashboardNavbar.onCreated(() => {
  Session.set('isCreatePackage', localStorage.getItem('createPackage'));
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
