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
        accessToken: 'SpyGmg1LohQgvGPtKEbdZw))',
        redirectUri: 'https://stackexchange.com/oauth/login_success',
        key: 'KJi1v7aNWJ8aziMts2QEmQ((',
        channelUrl: 'http://localhost:3000/#/blank'
    }
});
