/**
 * @param o
 * @param regexp
 * @param n
 * @returns true if validation is successful otherwise false
 */
function checkRegexp( o, regexp, n ) {
    if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
    } else {
        return true;
    }
}

/**
 * Update alert in popup
 * @param t
 */
function updateTips( t ) {
    tips
        .text( t )
        .addClass( "ui-state-highlight" );
    setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
    }, 500 );
}

/**
 * @param obj
 * @returns true if validation is successful
 */
function checkNull(obj){
    if(obj.val()==""){
        obj.addClass( "ui-state-error") ;
        return false;
    }
    else{
        obj.removeClass("ui-state-error")   ;
        return true;
    }
}

var ck_alpha = /^[A-Za-z]+$/;

/**
 * @param obj
 * @returns true if validation is successful
 */
function checkAlpha(obj){
    //console.log(obj.val());
    if (!ck_alpha.test(obj.val())) {
        //obj.addClass( "ui-state-error") ;
        //console.log('false')
        return false;
    }
    else{
        //obj.removeClass("ui-state-error")   ;
        return true;
        //console.log('true')
    }
}


var ck_date = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;

/**
 * @param obj
 * @returns true if validation is successful
 */
function checkDate(obj){
    //console.log(obj.val());
    if (!ck_date.test(obj.val())) {
        obj.addClass( "ui-state-error") ;
        //console.log('false')
        return false;
    }
    else{
        obj.removeClass("ui-state-error")   ;
        return true;
        //console.log('true')
    }
}


/**
 * @param G
 * @param row
 * @param col
 * @param name
 */
function showPopUp(G,row,col,name){

}
