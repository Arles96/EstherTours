import './toDecimal.html'

Template.convertDecimal.helpers({
    toDecimal: price =>{
        toDecimal = price.toFixed(2);
        return toDecimal;
    }
});