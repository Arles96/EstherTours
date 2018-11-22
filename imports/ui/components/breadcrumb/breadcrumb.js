import './breadcrumb.html';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

Template.breadcrumb.helpers({
  list: () => Session.get('listBreadcrum')
});
