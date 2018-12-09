import './resultTransport.html';
import { Session } from 'meteor/session';

Template.resultTransport.helpers({
  data: () => Session.get('resultFindTransport').doc,
  query: () => Session.get('resultFindTransport').query
});
