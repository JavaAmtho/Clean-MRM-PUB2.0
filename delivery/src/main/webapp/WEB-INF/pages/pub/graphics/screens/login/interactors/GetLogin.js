/**
 *
 * @constructor
 */
function GetLogin(){

}

/**
 * function login
 */
GetLogin.login = function(){
    Router.loadTemplate("homeScreen");
    $(".logout").css( "visibility", "visible" );
    $(".wrapper").css( "visibility", "visible" );
    $(".profileLogo").css( "visibility", "visible" );
}
