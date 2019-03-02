import './editSubscription.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { SubscriptionsSchema } from '../../../api/subscriptions/subscriptions';

Template.editSubscription.helpers({
  SubscriptionsSchema: () => SubscriptionsSchema,
  subscription: () => Session.get('subscriptionEdit')
});

AutoForm.addHooks('editSubscriptionForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado la suscripción.');
    $('#editSubscription').modal('hide');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
