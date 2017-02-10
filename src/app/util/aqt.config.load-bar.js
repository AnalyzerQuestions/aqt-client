angular.module("aqtApp").config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    cfpLoadingBarProvider.spinnerTemplate = false;
    //cfpLoadingBarProvider.spinnerTemplate = '<div id=""><i class="fa fa-refresh fa-spin"></i></div>';

}])
