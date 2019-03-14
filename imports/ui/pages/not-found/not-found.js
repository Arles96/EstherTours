import './not-found.html';
import { Template } from 'meteor/templating';

Template.appNotFound.onRendered(() => {
  let d = new Date();
  d = (d.getHours() +
    (d.getMinutes() / 100) +
    (d.getSeconds() / 10000) +
    (d.getMilliseconds() / 10000000)) * 1000 / 23;
  document.getElementsByClassName('sky')[0].setAttribute('style', `bottom: -${d}%`);
  // console.log(d);
});

Template.appNotFound.helpers({
  landscape: () => {
    return window.innerWidth > 780;
  }
});
