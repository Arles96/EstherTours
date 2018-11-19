import { Router } from 'meteor/iron:router';

// Import layouts
import '../../ui/layouts/body/body';

// import pages
import '../../ui/pages/account/account';
import '../../ui/pages/not-found/not-found';

Router.configure({
  layoutTemplate: 'App_body',
  notFoundTemplate: 'App_notFound'
});

Router.route('/', {
  name: 'home',
  template: 'signIn'
});
