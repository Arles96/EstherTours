import { Meteor } from 'meteor/meteor';

export const isNotLogin = self => {
  if (!Meteor.user()) {
    self.next();
  } else {
    Router.go('/dashboard');
  }
};

export const isLogin = self => {
  if (Meteor.user()) {
    self.next();
  } else {
    Router.go('/');
  }
};
