import './toDecimal.html';

Template.convertDecimal.helpers({
  toDecimal: price => {
    const toDecimal = price.toFixed(2);
    return toDecimal;
  }
});
