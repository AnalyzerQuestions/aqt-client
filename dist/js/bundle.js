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
angular.module("aqtApp", ['ngRoute', 'components', 'templates', 'common', 'pascalprecht.translate', 'angular-loading-bar', 'blockUI', 'ngAnimate']);

angular.module("aqtApp").config(["$httpProvider", function($httpProvider) {
    $httpProvider.interceptors.push("errorResolverInterceptor");
}]);

angular.module("aqtApp").run(['$rootScope', '$location', function($rootScope, $location) {

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        $('.button-collapse').sideNav('destroy');

        if (localStorage.getItem("userToken")) {
            if ($location.path() === '/') {
                $location.path('/main');
            }

        } else {
            if ($location.path() !== '/') {
                $location.path('/')
            }
        }
    });
}]);
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
        templateUrl: './main.html',
        controller: 'mainController as mainCtrl'

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
angular.module("common").component('sideNav', {

    templateUrl: './side-nav.component.html',

    controller: ["$location", "$http", "aqtValue", function($location, $http, aqtValue) {

        $(".button-collapse").sideNav({
            draggable: true
        });

        var userToken = localStorage.getItem("userToken");

        var vm = this;
        vm.user = {};

        if (userToken) {

            $http({
                method: 'GET',
                url: aqtValue.so.api + "/me",
                params: {
                    key: aqtValue.so.key,
                    access_token: userToken,
                    site: aqtValue.so.site,
                    filter: 'vqc7J'
                }
            }).success(function(data) {
                vm.user = data.items[0];

            }).error(function(data) {
                Materialize.toast("Ocorreu um problema ao recuperar o usuário", 6000);
                $location.path('#/');
            });

        } else {
            $location.path('/');
        }

        vm.signout = function() {
            localStorage.clear();
            $location.path('#/login');
        }
    }]
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
/**
 * @ngdoc module
 * @name components
 *
 * @description
 * This is the common module.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/

angular.module('components', ['simplemde']);

angular.module("components").config(["$httpProvider", function($httpProvider) {
    $httpProvider.interceptors.push("tokenInterceptor");
}]);
})(window.angular);
(function(angular){
'use strict';
angular.module("components").directive('simpleMde', function() {
    return {
        restrict: 'E',
        require: '?ngModel',
        template: `<textarea></textarea>`,
        link: function(scope, element, attrs, ngModelCtrl) {
            var editor = new SimpleMDE({
                element: element[0].querySelector('textarea'),
                spellChecker: true,
                styleSelectedText: true,
                showIcons: ["code"],
                forceSync: true,
                indentWithTabs: false,
                lineWrapping: false,
                hideIcons: ["heading", "fullscreen", "side-by-side"],
                previewRender: function(plainText, preview) {
                    setTimeout(function() {
                        preview.innerHTML = this.parent.markdown(plainText);
                        Prism.highlightAll();
                    }.bind(this), 1)
                    return "Loading..."
                },
                tabSize: 1,
                status: false,
                lineWrapping: true,
            });
            editor.codemirror.on('change', function() {
                ngModelCtrl && ngModelCtrl.$setViewValue(editor.markdown(editor.codemirror.getValue()));
            });
        }
    }
})
})(window.angular);
(function(angular){
'use strict';
/**
 * @ngdoc module
 * @name components
 *
 * @description
 * This is the directive to chip input.
 *
 * @author <a href="http://krescruz.github.io/npm angular-materialize/#chips">Angular Materialize</a>
 **/
angular.module("components").directive('aqtchip', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        scope: {
            ngModel: '=',
            placeholder: '@',
            secondaryPlaceholder: '@',
        },
        link: function(scope, element, attrs) {
            $timeout(function() {
                element.material_chip({
                    data: scope.ngModel || [],
                    placeholder: scope.placeholder || '',
                    secondaryPlaceholder: scope.secondaryPlaceholder || '',
                })
                element.on('chip.add', function(e, chip) {
                    scope.ngModel = element.data().chips.map(function(item) {
                        return item.tag
                    })
                    scope.$apply()
                })
                element.on('chip.delete', function(e, chip) {
                    scope.ngModel = element.data().chips.map(function(item) {
                        return item.tag
                    })
                    scope.$apply()
                })
            })
        }
    };
}]);
})(window.angular);
(function(angular){
'use strict';
angular.module("components").factory("errorResolverInterceptor", ["$q", "$location", function($q, $location) {
    var errorResolverInterceptor = {
        responseError: function(response) {
            if (response.status >= 500) {
                Materialize.toast("Ocorreu algum erro no servidor... tente novamente mais tarde!", 5000);
            }

            if (response.status >= 400 && response.status < 500) {
                Materialize.toast("Recurso não encontrado", 5000);
            }
            return $q.reject(response);
        }
    };
    return errorResolverInterceptor;
}]);
})(window.angular);
(function(angular){
'use strict';
angular.module("components").factory("tokenInterceptor", ["$q", "$location", function($q, $location) {

    return {

        'response': function(config) {

            return config;
        }
    };

}]);
})(window.angular);
(function(angular){
'use strict';
angular.module("aqtApp").config(['$translateProvider', function($translateProvider) {
    $translateProvider.translations('en', {
        'APP_NAME': "Question's Advisor",
        'BT_AUTHORIZE': 'AUTHORIZE',
        'BT_IGNORE': 'IGNORE',
        'BT_MAIN_AUTH': 'Follow',
        'BT_POST': 'POST QUESTION',
        'LB_LOGIN_TITLE': 'Login in with account Stack Overflow in Portuguese',
        'LB_MAIN_TITLE': 'My Questions',
        'LB_NQ_QUESTION_TITLE': 'Question title',
        'LB_NQ_TITLE': 'Write your programming question',
        'LB_NQ_QUESTION_TAG': 'Question tags',
        'LB_MENU_NEW_Q': 'Ask Question',
        'LB_MENU_MY_Q': 'My Questions',
        'LB_MENU_OUT': 'Sign out',
        'LB_MAIN_EMPTY': 'No published questions',
        'LB_SUGGESTIONS': 'Improve your question',
        'MSG_TOAS_CONFIRM': 'Question publised!'

    });

    $translateProvider.translations('pt', {
        'APP_NAME': "Question's Advisor",
        'BT_AUTHORIZE': 'AUTORIZAR',
        'BT_IGNORE': 'IGNORAR',
        'BT_MAIN_AUTH': 'Acompanhar',
        'BT_POST': 'PUBLICAR PERGUNTA',
        'LB_MAIN_TITLE': 'Minhas Perguntas',
        'LB_LOGIN': 'Login com sua conta do Stack Overflow em Português',
        'LB_NQ_TITLE': 'Escreva sua Pergunta de Programação',
        'LB_NQ_QUESTION_TITLE': 'Título da Pergunta',
        'LB_NQ_QUESTION_TAG': 'Tags da pergunta',
        'LB_MENU_NEW_Q': 'Faça uma pergunta',
        'LB_MENU_MY_Q': 'Minhas Perguntas',
        'LB_MENU_OUT': 'Sair',
        'LB_MAIN_EMPTY': 'Nenhuma pergunta publicada',
        'LB_SUGGESTIONS': 'Dicas para melhorar sua pergunta',
        'MSG_TOAS_CONFIRM': 'Pergunta postada com sucesso!'
    });

    $translateProvider.preferredLanguage('en');
}]);
})(window.angular);
(function(angular){
'use strict';
angular.module("aqtApp").config(["blockUIConfig", function(blockUIConfig) {
    //  blockUIConfig.template = '<div id=""><i class="fa fa-refresh fa-spin"></i></div>';
    blockUIConfig.autoBlock = false;

}]);
})(window.angular);
(function(angular){
'use strict';
angular.module("aqtApp").config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    cfpLoadingBarProvider.spinnerTemplate = false;
}])
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

    api: "https://aqt.herokuapp.com/",

    so: {
        site: 'pt.stackoverflow',
        api: 'https://api.stackexchange.com/2.2/',
        clientId: 8955,
        scopeList: ['read_inbox', 'no_expiry ', 'write_access'],
        key: 'bvot7qoa6k1gD4UfXAfYJA((',
        channelUrl: 'https://appif.herokuapp.com/#/blank'
    }
});
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

    SE.init({
        clientId: aqtValue.so.clientId,
        key: aqtValue.so.key,
        channelUrl: aqtValue.so.channelUrl,
        complete: function(data) {}
    });

    vm.login = function() {
        SE.authenticate({
            success: function(data) {
                var soPt;
                data.networkUsers.forEach(function(network) {
                    if (network.site_url == "http://pt.stackoverflow.com") {
                        soPt = network;
                    }
                })
                if (soPt) {
                    localStorage.setItem("userToken", data.accessToken);
                    $location.path('/main');
                } else {
                    Materialize.toast("Sua Conta não esta associada ao stack overflow", 5000);
                }
            },
            error: function(data) {
                Materialize.toast("Ocorreu algum problema do stack overflow, tente mais tarde", 5000);
            },
            scope: aqtValue.so.scopeList,
            networkUsers: true
        });

        if (localStorage.getItem("userToken")) {
            $location.path('/main');
        }
    }

}]);
})(window.angular);
(function(angular){
'use strict';
/**
 * @ngdoc service
 * @name login Service
 *
 * @description
 * This is the login service.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
// angular.module("components").factory("loginService", function($http, aqtValue) {
//
//     var _login = function() {
//         return $http.jsonp(aqtValue.so.test).then(function(response) {
//             callback(response.data);
//         });
//     };
// };
//
// return {
//     login: _login
// }
//
// });
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
angular.module("components").controller("mainController", ["$scope", "$http", "questionsSoService", function($scope, $http, questionsSoService) {

    var vm = this;
    vm.questions = {};
    vm.isQuestions = false;

    questionsSoService.getQuestions(function(response) {
        vm.questions = response.items;
        if (vm.questions.length) {
            vm.isQuestions = true;
        }
    });
}]);
})(window.angular);
(function(angular){
'use strict';
/**
 * @ngdoc service
 * @name questiions SO Service
 *
 * @description
 * This is the questions from SO service.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("components").factory("questionsSoService", ["$http", "aqtValue", function($http, aqtValue) {

    var _getQuestions = function(callback) {
        var userToken = localStorage.getItem("userToken");
        return $http({
            method: 'GET',
            url: aqtValue.so.api + "/me/questions",
            params: {
                key: aqtValue.so.key,
                access_token: userToken,
                site: aqtValue.so.site,
                filter: 'vqc7J'
            }
        }).success(function(response) {
            callback(response);
        });
    };

    return {
        getQuestions: _getQuestions
    }
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
angular.module("components").controller("newQuestionController", ["questionService", "$scope", "$location", "blockUI", function(questionService, $scope, $location, blockUI) {

    var vm = this;

    vm.question = {};
    vm.suggestions = [];
    vm.open = false;

    vm.register = function() {
        blockUI.start('Checking question...');
        questionService.getSuggestions(vm.question, function(response) {
            vm.suggestions = response;

            if (vm.suggestions.length) {
                blockUI.stop();
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
            $location.path("/main");
            Materialize.toast("Pergunta Publicada com  sucesso", 6000);
        });
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

        return $http({
            method: 'POST',
            url: aqtValue.so.api + '/questions/add',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function(obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {
                key: aqtValue.so.key,
                access_token: localStorage.getItem("userToken"),
                site: aqtValue.so.site,
                title: question.title,
                body: question.description,
                tags: question.tags
            }
        }).then(function(response) {
            callback(response);
        });
    };

    return {
        getSuggestions: _getSuggestions,
        postQuestion: _postQuestion
    }
}]);
})(window.angular);
(function(angular){
'use strict';
angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('./floating-button.component.html','<div class="fixed-action-btn"><a ng-href="{{$ctrl.url}}" class="btn-floating btn-large waves-effect waves-light red"><i class="large material-icons">{{$ctrl.icon}}</i></a></div>');
$templateCache.put('./navBar.component.html','<nav class="navbar-fixed cyan darken-2"><div class="nav-wrapper"><a id="navAqt" data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i> </a><a href="#/" data-activates="slide-out" class="brand-logo center button-collapse">{{$ctrl.name | translate}}</a><ul class="right"><li><a href="#/"><i class="material-icons">more_vert</i></a></li></ul></div></nav>');
$templateCache.put('./side-nav.component.html','<ul id="slide-out" class="side-nav fixed"><li><div class="userView"><div class="background cyan darken-2"><!-- <img src="assets/img/bg.jpg"> --></div><a href="{{$ctrl.user.link}}"><img class="circle" ng-src="{{$ctrl.user.profile_image}}"></a><a href="{{$ctrl.user.link}}"><span class="white-text name"><b>{{$ctrl.user.display_name}}</b></span></a> <a class="aqt-nav-site"><span class="white-text name aqt-nav-site"><small>stack Overflow em Portugu\xEAs</small></span></a></div></li><li><a href="#/new"><i class="material-icons">mode_edit</i>{{\'LB_MENU_NEW_Q\' | translate}}</a></li><li><div class="divider"></div></li><li><a href="#/main"><i class="material-icons">view_list</i>{{\'LB_MENU_MY_Q\' | translate}}</a></li><li><div class="divider"></div></li><li><a href="#/login" ng-click="$ctrl.signout()"><i class="material-icons">power_settings_new</i>{{\'LB_MENU_OUT\' | translate}}</a></li></ul>');
$templateCache.put('./suggestions.component.html','<div ng-show="$ctrl.open" {{$ctrl.open}}><div id="suggestionsModal" class="modal bottom-sheet"><div class="modal-content"><div class="row"><div class="col s9"><h4><small>{{ \'LB_SUGGESTIONS\' | translate }}</small></h4></div><div class="col s3"><!-- <button class="btn">{{ \'BT_IGNORE\' | translate }}</button> --></div></div><div class="row"><div class="col s12"><ul class="collection"><li class="collection-item" ng-repeat="sug in $ctrl.suggestions"><span class="title"><b>{{sug.header}}</b></span><br><span ng-repeat="m in sug.subHeaders"><i>{{m}}</i><br></span></li></ul></div></div></div></div></div>');
$templateCache.put('./blank.html','');
$templateCache.put('./login.html','<div class="login"><div class="section"></div><div class="section"></div><div class="container"><center><img class="responsive-img" style="width: 300px" src="../assets/img/so-logo.png"><h5><small>{{ \'LB_LOGIN_TITLE\' | translate }}</small></h5></center><div class="section"></div><form class="col s12"><div class="row"><a name="btn_login" id="btn-login" ng-click="loginCtrl.login()" class="col s12 btn btn-large waves-effect yellow darken-3">AUTHORIZE</a></div></form></div></div>');
$templateCache.put('./main.html','<main><side-nav></side-nav><center ng-show="mainCtrl.isQuestions"><h5>{{ \'LB_MAIN_TITLE\' | translate }}</h5></center><center ng-show="!mainCtrl.isQuestions" class="aqt-empty-questions"><h5>{{ \'LB_MAIN_EMPTY\' | translate }}</h5></center><div ng-repeat="question in mainCtrl.questions"><div class="row"><div class="col s12 m6"><div class="card"><div class="card-content"><span class="card-title">{{question.title}}</span><div class="card-subtitle"><div class="row"><div ng-repeat="tag in question.tags"><span class="new badge" data-badge-caption="{{tag}}"></span></div></div><div align="center" class="aqt-card-info"><div class="col s4"><span>Answers: {{question.answer_count}}</span></div><div class="col s4"><span>Votes: {{question.score}}</span></div><div class="col s4"><span>View : {{question.view_count}}</span></div></div></div></div><div align="center" class="card-action"><a href="{{question.link}}">{{ \'BT_MAIN_AUTH\' | translate }}</a></div></div></div></div></div><btn-fb url="\'#/new\'" icon="add"></btn-fb></main>');
$templateCache.put('./new-question.html','<main><side-nav></side-nav><div class="container"><center><h5>{{ \'LB_NQ_TITLE\' | translate }}</h5></center><form class="col s12" name="nqForm" ng-submit="nqForm.$valid && nqCtrl.register()" role="form" novalidate><div class="row"><div class="col s12"></div></div><div class="row"><div class="input-field col s12" ng-class="{ \'data-error\' : nqForm.title.$error.required\t}"><input class="validate" name="title" type="text" name="title" ng-model="nqCtrl.question.title" id="title" required="" aria-required="true"><label for="title">{{ \'LB_NQ_QUESTION_TITLE\' | translate }}</label></div></div><div class="row"><div class="input-field col s12"><simple-mde id="description" ng-model="nqCtrl.question.description" class="materialize-textarea language-css" required="" aria-required="true"></simple-mde></div></div><div class="row"><div class="input-field col s12"><div id="tag" aqtchip ng-model="nqCtrl.question.tags" placeholder="Question tag" secondary-placeholder="Question tag" required="" aria-required="true"></div></div></div><br><div class="row"><div class="input-field col s12"><button type="submit" class="col s12 btn btn-large waves-effect cyan darken-2">{{ \'BT_POST\' | translate }}</button></div></div><suggestions-modal suggestions="nqCtrl.suggestions" open="nqCtrl.open"></suggestions-modal></form></div></main>');}]);})(window.angular);