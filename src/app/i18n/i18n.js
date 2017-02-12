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
