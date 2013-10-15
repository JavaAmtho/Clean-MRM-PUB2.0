/**
 *
 * @constructor  LoginPresenter
 */
function LoginPresenter(){

}

/**
 * getLogin function
 * @description calls homeScreen load template function to load home page
 */
LoginPresenter.getLogin = function(){
    TemplateLoader.loadTemplate("homeScreen",LoginPresenter.makeLogoutBtnVisible);
}

/**
 * makeLogoutButtonVisible function
 * @description makes logout button visible
 */
LoginPresenter.makeLogoutBtnVisible = function(){
    $(".logout").css( "visibility", "visible" );
    $(".wrapper").css( "visibility", "visible" );
    $(".profileLogo").css( "visibility", "visible" );
}
