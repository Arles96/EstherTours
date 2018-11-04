import { Meteor } from 'meteor/meteor';
import Links from '../../../api/links/links';
import './info.html';

Template.info.onCreated(() => {
  Meteor.subscribe('links.all');
});

Template.info.helpers({
  links () {
    return Links.find();
  }
});

Template.info.events({
  'submit .info-link-add' (event) {
    event.preventDefault();

    const { title, url } = event.target;

    Meteor.call('links.insert', title.value, url.value, error => {
      if (error) {
        alert(error.error);
      } else {
        title.value = '';
        url.value = '';
      }
    });
  }
});
