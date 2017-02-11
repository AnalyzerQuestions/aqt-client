angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('./floating-button.component.html','<div class="fixed-action-btn"><a ng-href="{{$ctrl.url}}" class="btn-floating btn-large waves-effect waves-light red"><i class="large material-icons">{{$ctrl.icon}}</i></a></div>');
$templateCache.put('./navBar.component.html','<nav class="navbar-fixed cyan darken-2"><div class="nav-wrapper"><a data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a> <a href="#/" data-activates="slide-out" class="brand-logo center button-collapse">{{$ctrl.name | translate}}</a><ul class="right"><li><a href="#/"><i class="material-icons">more_vert</i></a></li></ul></div></nav>');
$templateCache.put('./side-nav.component.html','<ul id="slide-out" class="side-nav"><li><div class="userView"><div class="background cyan darken-2"><!-- <img src="assets/img/bg.jpg"> --></div><a href="{{$ctrl.user.link}}"><img class="circle" ng-src="{{$ctrl.user.profile_image}}"></a><a href="{{$ctrl.user.link}}"><span class="white-text name"><b>{{$ctrl.user.display_name}}</b></span></a> <span class="white-text name">stack Overflow em Portugu\xEAs</span></div></li><li><a href="#/new"><i class="material-icons">mode_edit</i>{{\'LB_MENU_NEW_Q\' | translate}}</a></li><li><div class="divider"></div></li><li><a href="#/main"><i class="material-icons">view_list</i>{{\'LB_MENU_MY_Q\' | translate}}</a></li><li><div class="divider"></div></li><li><a href="#/login" ng-click="$ctrl.signout()"><i class="material-icons">power_settings_new</i>{{\'LB_MENU_OUT\' | translate}}</a></li></ul>');
$templateCache.put('./suggestions.component.html','<div ng-show="$ctrl.open" {{$ctrl.open}}><div id="suggestionsModal" class="modal bottom-sheet"><div class="modal-content"><div class="row"><div class="col s8"><h4><small>Dicas para melhorar sua pergunta</small></h4></div><div class="col s4"><button>{{ \'BT_IGNORE\' | translate }}</button></div></div><ul class="collection"><li class="collection-item" ng-repeat="sug in $ctrl.suggestions"><span class="title"><b>{{sug.header}}</b></span><br><span ng-repeat="m in sug.subHeaders"><i>{{m}}</i><br></span></li></ul></div></div></div>');
$templateCache.put('./blank.html','');
$templateCache.put('./login.html','<div class="section"></div><div class="section"></div><div class="container"><center><img class="responsive-img" style="width: 300px" src="../assets/img/so-logo.png"><h4><small>{{ \'LB_LOGIN_TITLE\' | translate }}</small></h4></center><div class="section"></div><form class="col s12"><div class="row"><a name="btn_login" id="btn-login" ng-click="loginCtrl.login()" class="col s12 btn btn-large waves-effect yellow darken-3">AUTHORIZE</a></div></form></div>');
$templateCache.put('./main.html','<side-nav></side-nav><center><h4>{{ \'LB_MAIN_TITLE\' | translate }}</h4></center><div class="row"><div class="col s12 m6"><div class="card"><div class="card-content"><span class="card-title">Qual a diferen\xE7a de uma toolbar para uma action bar?</span><p class="card-subtitle"><a href="#"><span class="new badge" data-badge-caption="java"></span></a> <a href="#"><span class="new badge" data-badge-caption="android"></span><a></a></p></div><div align="center" class="card-action"><a href="#">{{ \'BT_MAIN_AUTH\' | translate }}</a></div></div></div></div><div class="row"><div class="col s12 m6"><div class="card"><div class="card-content"><span class="card-title">Qual a diferen\xE7a entre spring e JavaEE?</span><p class="card-subtitle"><a href="#"><span class="new badge" data-badge-caption="java"></span></a></p></div><div align="center" class="card-action"><a href="#">{{ \'BT_MAIN_AUTH\' | translate }}</a></div></div></div></div><btn-fb url="\'#/new\'" icon="add"></btn-fb>');
$templateCache.put('./new-question.html','<side-nav></side-nav><div class="container"><center><h5>{{ \'LB_NQ_TITLE\' | translate }}</h5></center><form class="col s12" name="nqForm" ng-submit="nqForm.$valid && nqCtrl.register()" role="form" novalidate><div class="row"><div class="col s12"></div></div><div class="row"><div class="input-field col s12"><input class="validate" type="text" name="title" ng-model="nqCtrl.question.title" id="title"><label for="title">{{ \'LB_NQ_QUESTION_TITLE\' | translate }}</label></div></div><div class="row"><div class="input-field col s12"><simple-mde id="description" ng-model="nqCtrl.question.description" class="materialize-textarea language-css"></simple-mde></div></div><div class="row"><div class="input-field col s12"><div id="tag" aqtchip ng-model="nqCtrl.question.tags" placeholder="Question tag" secondary-placeholder="Question tag"></div></div></div><br><div class="row"><div class="input-field col s12"><button id="postQuestion" class="col s12 btn btn-large waves-effect cyan darken-2">{{ \'BT_POST\' | translate }}</button></div></div><suggestions-modal suggestions="nqCtrl.suggestions" open="nqCtrl.open"></suggestions-modal></form></div>');}]);