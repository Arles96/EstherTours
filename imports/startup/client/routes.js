import { Router } from 'meteor/iron:router';
import { isLoggedIn, isNotLoggedIn } from './validations';
// Import layouts
import '../../ui/layouts/body/body';
import '../../ui/layouts/bodyAdmin/bodyAdmin';

// import pages
import '../../ui/pages/account/account';
import '../../ui/pages/not-found/not-found';
import '../../ui/pages/initialDashboard/initialDashboard';

Router.configure({
  layoutTemplate: 'App_body',
  notFoundTemplate: 'App_notFound'
});

Router.route('/', {
  name: 'home',
  template: 'signIn',
  onBeforeAction: function () {
    isNotLoggedIn(this);
  }
});

Router.route('/dashboard', {
  name: 'dashboard',
  layoutTemplate: 'bodyAdmin',
  template: 'initialDashboard',
  onBeforeAction: function () {
    isLoggedIn(this);
  }
});
