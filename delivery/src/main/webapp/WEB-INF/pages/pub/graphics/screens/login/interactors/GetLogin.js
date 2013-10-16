/**
 *
 * @constructor
 */
function GetLogin(){

}

/**
 * function login
 * @description loads the home screen on click of login
 */
GetLogin.login = function(){
    Router.loadTemplate("homeScreen");
    $(".logout").css( "visibility", "visible" );
    $(".wrapper").css( "visibility", "visible" );
    $(".profileLogo").css( "visibility", "visible" );
}
