/* import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import Links from './links';
import './methods';

if (Meteor.isServer) {
  describe('links methods', () => {
    beforeEach(() => {
      Links.remove({});
    });

    it('can add a new link', () => {
      const addLink = Meteor.server.method_handlers['links.insert'];

      addLink.apply({}, ['meteor.com', 'https://www.meteor.com']);

      assert.equal(Links.find().count(), 1);
    });
  });
} */
