(function(angular){
'use strict';
/**
 * @ngdoc module
 * @name aqtApp
 *
 * @description
 * This is the aqtApp module. It is the major module.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("aqtApp", ['ngRoute', 'components', 'templates', 'common','simplemde']);


// if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
//
//   navigator.serviceWorker.register('sw.js', {scope: './'
//   }).then(function(registration) {
//     if (typeof registration.update == 'function') {
//       registration.update();
//     }
//   }).catch(function(e) {
//     console.error('Error during service worker registration:', e);
//   });
//
// };
})(window.angular);
(function(angular){
'use strict';
/**
 * @ngdoc router
 * @name Route Provide
 *
 * @description
 * This is the aqtApp router. It is the major route.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("aqtApp").config(["$routeProvider", function($routeProvider) {

    $routeProvider.when("/main", {
        templateUrl: './main.html'

    }).when("/blank", {
        templateUrl: './blank.html'

    }).when("/", {
        templateUrl: './login.html',
        controller: 'loginController as loginCtrl'

    }).when("/new", {
        templateUrl: './new-question.html',
        controller: 'newQuestionController as nqCtrl'

    }).otherwise({
        redirectTo: '/'
    });

}]);
})(window.angular);
(function(angular){
'use strict';
/**
 * @ngdoc module
 * @name common
 *
 * @description
 * This is the common module.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module('common', []);
})(window.angular);
(function(angular){
'use strict';
angular.module("common").component('btnFb', {

  bindings: {
    url: '<',
    icon: '@'
  },

  templateUrl: './floating-button.component.html',

});
})(window.angular);
(function(angular){
'use strict';
angular.module("common").component('navBar', {

  bindings: {
    name: '<'
  },

  templateUrl: './navBar.component.html',

  controller: function(){

  }

});
})(window.angular);
(function(angular){
'use strict';
angular.module("common").component('suggestionsModal', {

    bindings: {
        suggestions: '=',
        open: '<'
    },

    templateUrl: './suggestions.component.html',

    controller: function() {

        function showModal() {
            $('#suggestionsModal').modal('open');
        };

        this.$onInit = function() {
            $(document).ready(function() {
                $('.modal').modal();

            });
        };

        this.onDestry = function() {
            this.suggestions = [];
        };
    }
});
})(window.angular);
(function(angular){
'use strict';
})(window.angular);
(function(angular){
'use strict';
/**
 * @ngdoc module
 * @name common
 *
 * @description
 * This is the common module.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module('components', ['ngTagsInput']);
})(window.angular);
(function(angular){
'use strict';
/**
 * @ngdoc controller
 * @name login controller
 *
 * @description
 * This is the login controller.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("components").controller("loginController", ["$location", "aqtValue", function($location, aqtValue) {

    var vm = this;

    initSO();

    vm.login = function() {

        $(function() {
            SE.authenticate({
                success: function(data) {
                    console.log('Success :', data);
                },
                error: function(data) {
                    console.log('Error: ', data);
                },
                networkUsers: true,
                scope: aqtValue.so.scopeList
            });

        });
        $location.path('/main');
    }

    function initSO() {
        $(function() {
            SE.init({
                clientId: aqtValue.so.clientId,
                key: aqtValue.so.key,
                channelUrl: aqtValue.so.channelUrl,
                complete: function(data) {
                    console.log('Init: ', data);
                }
            });
        });
    };

}]);
})(window.angular);
(function(angular){
'use strict';
})(window.angular);
(function(angular){
'use strict';
/**
 * @ngdoc controller
 * @name Main controller
 *
 * @description
 * This is the main controller.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("components").controller("mainController", ["$scope", function($scope) {


}]);
})(window.angular);
(function(angular){
'use strict';
/**
 * @ngdoc controller
 * @name question controller
 *
 * @description
 * This is the new question controller.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("components").controller("newQuestionController", ["questionService", function(questionService) {

    var vm = this;

    vm.question = {};
    vm.tags = [];
    vm.suggestions = [];
    vm.open = false;

    vm.register = function() {
        resolveTagComponent(vm.tags);
        questionService.getSuggestions(vm.question, function(response) {
            vm.suggestions = response;

            if (vm.suggestions.length) {
                vm.open = true;
                $('#suggestionsModal').modal('open');
            }
            if (!vm.open) {
                postQuestion(vm.question);
            }

        });
    };

    var postQuestion = function(question) {
        questionService.postQuestion(question, function(response) {
            console.log(response);
        });
    };


    function resolveTagComponent(tags) {
        if (tags) {
            if (!vm.question.tags) {
                vm.question.tags = [];
            }
            tags.forEach(function(tag) {
                vm.question.tags.push(tag.text);
            })
        }
    };
}]);
})(window.angular);
(function(angular){
'use strict';
/**
 * @ngdoc service
 * @name question Service
 *
 * @description
 * This is the question service.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("components").factory("questionService", ["$http", "aqtValue", function($http, aqtValue) {

    var _getSuggestions = function(question, callback) {
        return $http.post(aqtValue.api + "analyzerOnly", question).then(function(response) {
            callback(response.data);
        });

    };

    var _postQuestion = function(question, callback) {
        var config = {
            params: {
                title: question.title,
                body: question.description,
                tags: question.tags,
                site: aqtValue.so.site,
                key: aqtValue.so.key,
                access_token: aqtValue.so.accessToken,
                preview: true,
                filter: 'default',
                run: true
            }
        }

        return $http.jsonp(aqtValue.so.api + 'questions/add', config).then(function(response) {
            callback(response.data);
        });

    };

    return {
        getSuggestions: _getSuggestions,
        postQuestion: _postQuestion
    }

}]);;
})(window.angular);
(function(angular){
'use strict';
/**
 * @ngdoc value
 * @name AQT Value
 *
 * @description
 * This is major value this app.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("components").value("aqtValue", {

    api: "http://localhost:8080/",

    so: {
        site: 'pt.stackoverflow',
        apiAuth: 'https://stackexchange.com/',
        api: 'https://api.stackexchange.com/2.2/',
        clientId: 7786,
        scopeList: ['write_access'],
        accessToken: 'U(s44Rn04*aAE2OYKOS4jg))',
        redirectUri: 'https://stackexchange.com/oauth/login_success',
        key: 'KJi1v7aNWJ8aziMts2QEmQ((',
        channelUrl: 'https://aqt-prot.herokuapp.com/#/blank'
    }
});
})(window.angular);
(function(angular){
'use strict';
angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('./floating-button.component.html','<div class="fixed-action-btn"><a ng-href="{{$ctrl.url}}" class="btn-floating btn-large waves-effect waves-light red"><i class="large material-icons">{{$ctrl.icon}}</i></a></div>');
$templateCache.put('./navBar.component.html','<nav class="navbar-fixed cyan darken-2"><div class="nav-wrapper"><a href="/" data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a> <a href="/" data-activates="slide-out" class="brand-logo center button-collapse">{{$ctrl.name}}</a><ul class="right"><li><a href="/"><i class="material-icons">more_vert</i></a></li></ul></div></nav>');
$templateCache.put('./suggestions.component.html','<div ng-show="$ctrl.open" {{$ctrl.open}}><div id="suggestionsModal" class="modal bottom-sheet"><div class="modal-content"><h5>Algumas dicas para melhorar sua pergunta</h5><ul class="collection"><li class="collection-item" ng-repeat="sug in $ctrl.suggestions"><span class="title">{{sug.header}}</span><br><small ng-repeat="m in sug.subHeaders"><i>{{m}}</i><br></small></li></ul></div></div></div>');
$templateCache.put('./blank.html','');
$templateCache.put('./login.html','<nav-bar name="\'AQT\'"></nav-bar><div class="section"></div><div class="section"></div><div class="section"></div><div class="container"><center><img class="responsive-img" style="width: 300px" src="../assets/img/so-logo.png"><p><small>Fa\xE7a login com sua conta do Stack Overflow em Portugu\xEAs</small></p></center><div class="section"></div><div class="section"></div><div class="section"></div><form class="col s12"><div class="row"><a name="btn_login" ng-click="loginCtrl.login()" class="col s12 btn btn-large waves-effect yellow darken-3">Login com Stack Overflow</a></div></form></div>');
$templateCache.put('./main.html','<nav-bar name="\'AQT\'"></nav-bar><div class="row"></div><btn-fb url="\'#/new\'" icon="add"></btn-fb>');
$templateCache.put('./new-question.html','<nav-bar name="\'AQT\'"></nav-bar><div class="container"><center><p>Escreva sua Perguta de Programa\xE7\xE3o</p></center><form class="col s12" name="nqForm" ng-submit="nqForm.$valid && nqCtrl.register()" role="form" novalidate><div class="row"><div class="col s12"></div></div><div class="row"><div class="input-field col s12"><input class="validate" type="text" name="title" ng-model="nqCtrl.question.title" id="title"><label for="title">T\xEDtulo da Pergunta</label></div></div><div class="row"><div class="input-field col s12"><textarea simplemde="{spellChecker: false}" id="description" ng-model="nqCtrl.question.description" class="materialize-textarea"></textarea></div></div><div class="row"><div class="input-field col s12"><tags-input id="tag" ng-model="nqCtrl.tags"></tags-input></div></div><br><div class="row"><div class="input-field col s12"><button class="col s12 btn btn-large waves-effect cyan darken-2">POSTAR</button></div></div><suggestions-modal suggestions="nqCtrl.suggestions" open="nqCtrl.open"></suggestions-modal></form></div>');}]);})(window.angular);