/**
 *
 * @constructor
 */
function IsotopeWrapper(){

}

IsotopeWrapper.initialize = function(selector){
    $isotopeContainer = selector;
    selector.isotope();
}

IsotopeWrapper.checkIfInitializedAndDestroy = function(selector){
   /* if ($isotopeContainer) {
        $isotopeContainer.isotope('destroy');
    }*/
    console.log($isotopeContainer)
    console.log(selector)
}

IsotopeWrapper.insertChild = function(){

}

IsotopeWrapper.removeChild = function(){

}