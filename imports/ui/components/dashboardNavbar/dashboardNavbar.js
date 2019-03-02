import './dashboardNavbar.html';
import '../namePackageModal/namePackageModal';
import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import $ from 'jquery';
import { clearValues, setValues } from '../../../startup/client/packageFunction';

Template.dashboardNavbar.onCreated(() => {
  setValues();
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
    clearValues();
  }
});
