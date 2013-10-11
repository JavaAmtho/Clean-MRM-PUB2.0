/**
 *
 * @constructor
 */
function LoginPresenter(){

}

/**
 * function getlogin
 */
LoginPresenter.getLogin = function(){
    TemplateLoader.loadTemplate("homeScreen",LoginPresenter.makeLogoutBtnVisible);
}

/**
 * function to make logout button visible
 */
LoginPresenter.makeLogoutBtnVisible = function(){
    $(".logout").css( "visibility", "visible" );
    $(".wrapper").css( "visibility", "visible" );
    $(".profileLogo").css( "visibility", "visible" );
}
