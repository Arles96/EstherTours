import { Router } from 'meteor/iron:router';

// Import needed templates
import '../../ui/layouts/body/body';
import '../../ui/pages/home/home';
import '../../ui/pages/not-found/not-found';

Router.configure({
  layoutTemplate: 'App_body',
  notFoundTemplate: 'App_notFound'
});

Router.route('/', {
  name: 'home',
  template: 'App_home'
});
