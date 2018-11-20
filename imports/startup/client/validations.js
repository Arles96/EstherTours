import { Meteor } from 'meteor/meteor';

export const isNotLoggedIn = self => {
  if (!Meteor.user()) {
    self.next();
  } else {
    Router.go('/dashboard');
  }
};

export const isLoggedIn = self => {
  if (Meteor.user()) {
    self.next();
  } else {
    Router.go('/');
  }
};
