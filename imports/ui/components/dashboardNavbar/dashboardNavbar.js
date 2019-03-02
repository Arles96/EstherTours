import './dashboardNavbar.html';
import '../namePackageModal/namePackageModal';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import $ from 'jquery';
import { clearValues, setValues } from '../../../startup/client/packageFunction';

Template.dashboardNavbar.onCreated(() => {
  setValues();
});

Template.dashboardNavbar.events({
  'click #logout': function () {
    const userId = Meteor.userId();
    Meteor.call('userLogout2', userId, (error, result) => {
      if (!error) {
        Accounts.logout();
        window.location = '/';
      }
    });
  },
  'click #createPackage': function () {
    $('#namePackageModal').modal('show');
  },
  'click #deletePackage': function () {
    clearValues();
  }
});
