import './showPackage.html';
import '../../components/toDecimal/toDecimal';

Template.showPackage.helpers({
  localDate: function () {
    return this.dateLimit.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
});
