angular.module("components").value("aqtValue", {

    api: "http://localhost:8080/",

    so: {
        site: 'pt.stackoverflow',
        apiAuth: 'https://stackexchange.com/',
        api: 'https://api.stackexchange.com/2.2/',
        clientId: 7786,
        scopeList: ['write_access', 'read_inbox'],
        accessToken: 'TODO',
        redirectUri: 'https://stackexchange.com/oauth/login_success',
        key: 'TODO',
        channelUrl: 'http://localhost:3000/#/blank'
    }
});
