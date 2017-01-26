angular.module("aqtApp").config(['$translateProvider', function($translateProvider) {
    $translateProvider.translations('en', {
        'APP_NAME': 'Assist Question',
        'LB_LOGIN_TITLE': 'Login in with account Stack Overflow in Portuguese',
        'BT_AUTHORIZE': 'AUTHORIZE',
        'LB_MAIN_TITLE': 'My Questions',
        'BT_MAIN_AUTH': 'Follow',
        'LB_NQ_TITLE': 'Write your programming question',
        'LB_NQ_QUESTION_TITLE': 'Question title',
        'LB_NQ_QUESTION_TAG': 'Question tags',
        'BT_POST': 'POST QUESTION',
        'MSG_TOAS_CONFIRM': 'Question publised!'

    });

    $translateProvider.translations('pt', {
        'APP_NAME': 'Assist Question',
        'LB_LOGIN': 'Login com sua conta do Stack Overflow em Português',
        'BT_AUTHORIZE': 'AUTORIZAR',
        'LB_MAIN_TITLE': 'Minhas Perguntas',
        'BT_MAIN_AUTH': 'Acompanhar',
        'LB_NQ_TITLE': 'Escreva sua Pergunta de Programação',
        'LB_NQ_QUESTION_TITLE': 'Título da Pergunta',
        'LB_NQ_QUESTION_TAG': 'Tags da pergunta',
        'BT_POST': 'PUBLICAR PERGUNTA',
        'MSG_TOAS_CONFIRM': 'Pergunta postada com sucesso!'
    });

    $translateProvider.preferredLanguage('en');
}]);
