/**
 *
 * @constructor
 */
function IsotopeWrapper(){

}

IsotopeWrapper.isotopeElem;     //TODO can covert this into array

IsotopeWrapper.initialize = function(selector){
    IsotopeWrapper.isotopeElem = selector;
    selector.isotope();
}

IsotopeWrapper.checkIfInitializedAndDestroy = function(selector){
    if (IsotopeWrapper.isotopeElem){
        IsotopeWrapper.isotopeElem.isotope('destroy');
    }
}

/**
 * @description set each dimension as even or odd which assigns different colour to them
 */
IsotopeWrapper.setEvenOddClassesToDimensions = function() {
    IsotopeWrapper.isotopeElem.find('.masterPage,.dimension,.chapter,.assortmentItem').each(function (key, value) {
        var $this = $(this),
            number = key + 1;
        if (number % 2 == 1) {
            $this.addClass('odd');
        }
        else {
            $this.addClass('even');
        }
    });
}

IsotopeWrapper.addFilter = function(selector){
    IsotopeWrapper.isotopeElem.isotope({ filter: selector });
}

IsotopeWrapper.relayout = function(){
    if(IsotopeWrapper.isotopeElem)
        IsotopeWrapper.isotopeElem.isotope('reLayout');
}

IsotopeWrapper.insertChild = function(itemsToInsert,masterPageDiv){
    IsotopeWrapper.isotopeElem.isotope('insert', $(itemsToInsert), $(masterPageDiv));
}

IsotopeWrapper.removeChild = function(childPages){
    IsotopeWrapper.isotopeElem.isotope('remove', childPages);
}