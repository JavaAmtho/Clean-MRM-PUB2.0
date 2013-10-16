/**
 *
 * @constructor
 */
function LoginPresenter(){

}

/**
 * function getlogin
 * @description loads the home template
 */
LoginPresenter.getLogin = function(){
    TemplateLoader.loadTemplate("homeScreen",LoginPresenter.makeLogoutBtnVisible);
}

/**
 * function to make logout button visible
 * @description callBack for login which makes logout btn visible
 */
LoginPresenter.makeLogoutBtnVisible = function(){
    $(".logout").css( "visibility", "visible" );
    $(".wrapper").css( "visibility", "visible" );
    $(".profileLogo").css( "visibility", "visible" );
}
