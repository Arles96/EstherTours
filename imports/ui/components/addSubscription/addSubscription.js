import './addSubscription.html';
import toastr from 'toastr';
import { SubscriptionsSchema } from '../../../api/subscriptions/subscriptions';

Template.addSubscription.helpers({
  SubscriptionsSchema: () => SubscriptionsSchema
});

AutoForm.addHooks('addSubscriptionForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha agregado la suscripción.');
    $('#addSubscription').modal('hide');
  },
  onError: function (formtype, error) {
    if (error.error === 'Repeated Email') {
      toastr.error(new Error('Ya existe una suscripción con ese correo!'));
    } else {
      toastr.error(error);
    }
  }
});
