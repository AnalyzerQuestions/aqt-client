angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('./floating-button.component.html','<div class="fixed-action-btn"><a ng-href="{{$ctrl.url}}" class="btn-floating btn-large waves-effect waves-light red"><i class="large material-icons">{{$ctrl.icon}}</i></a></div>');
$templateCache.put('./navBar.component.html','<nav class="navbar-fixed cyan darken-2"><div class="nav-wrapper"><a href="/" data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a> <a href="/" data-activates="slide-out" class="brand-logo center button-collapse">{{$ctrl.name}}</a><ul class="right"><li><a href="/"><i class="material-icons">more_vert</i></a></li></ul></div></nav>');
$templateCache.put('./suggestions.component.html','<div ng-show="$ctrl.open" {{$ctrl.open}}><div id="suggestionsModal" class="modal bottom-sheet"><div class="modal-content"><h5>Algumas dicas para melhorar sua pergunta</h5><ul class="collection"><li class="collection-item" ng-repeat="sug in $ctrl.suggestions"><span class="title">{{sug.header}}</span><br><small ng-repeat="m in sug.subHeaders"><i>{{m}}</i><br></small></li></ul></div></div></div>');
$templateCache.put('./blank.html','');
$templateCache.put('./login.html','<nav-bar name="\'AQT\'"></nav-bar><div class="section"></div><div class="section"></div><div class="section"></div><div class="container"><center><img class="responsive-img" style="width: 300px" src="../assets/img/so-logo.png"><p><small>Fa\xE7a login com sua conta do Stack Overflow em Portugu\xEAs</small></p></center><div class="section"></div><div class="section"></div><div class="section"></div><form class="col s12"><div class="row"><a name="btn_login" ng-click="loginCtrl.login()" class="col s12 btn btn-large waves-effect yellow darken-3">Login com Stack Overflow</a></div></form></div>');
$templateCache.put('./main.html','<nav-bar name="\'AQT\'"></nav-bar><div class="row"></div><btn-fb url="\'#/new\'" icon="add"></btn-fb>');
$templateCache.put('./new-question.html','<nav-bar name="\'AQT\'"></nav-bar><div class="container"><center><p>Escreva sua Perguta de Programa\xE7\xE3o</p></center>{{simplemde.get().value()}}<form class="col s12" name="nqForm" ng-submit="nqForm.$valid && nqCtrl.register()" role="form" novalidate><div class="row"><div class="col s12"></div></div><div class="row"><div class="input-field col s12"><input class="validate" type="text" name="title" ng-model="nqCtrl.question.title" id="title"><label for="title">T\xEDtulo da Pergunta</label></div></div><div class="row"><div class="input-field col s12"><textarea simplemde="nqCtrl.simplemdeOptions" id="description" ng-model="nqCtrl.question.description" class="materialize-textarea"></textarea></div></div><div class="row"><div class="input-field col s12"><tags-input id="tag" ng-model="nqCtrl.tags"></tags-input></div></div><br><div class="row"><div class="input-field col s12"><button class="col s12 btn btn-large waves-effect cyan darken-2">POSTAR</button></div></div><suggestions-modal suggestions="nqCtrl.suggestions" open="nqCtrl.open"></suggestions-modal></form></div>');}]);