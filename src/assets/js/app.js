angular.module('railroad', [
    'ui.router',
    'LocalStorageModule',
    'railroad.templates',
    'pages',
    'service',
    'cmps',
    'pascalprecht.translate'
]);
angular
    .module('railroad')
    .config([
        '$stateProvider',
        '$locationProvider',
        '$urlRouterProvider',
        'localStorageServiceProvider',
        '$translateProvider',
        function($stateProvider, $locationProvider, $urlRouterProvider, localStorageServiceProvider, $translateProvider) {
            //redirect to home state when we call the page without route information
            // $locationProvider.html5Mode(true);

            $translateProvider.useStaticFilesLoader({
                prefix: 'i18n/locale-',// path to translations files
                suffix: '.json'// suffix, currently- extension of the translations
            })
            .useMissingTranslationHandlerLog() // log if TRANSLATION_CODE not found
            .preferredLanguage('en_US')
            .fallbackLanguage('en_US');

            $urlRouterProvider.when('', '/');
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('index', {
                    url: '/',
                    views: {
                        header: {
                            templateUrl: 'pages/header/header.html',
                            controller: 'headerCtrl'
                        },
                        main: {
                            templateUrl: 'pages/home/home.html',
                            controller: 'homeCtrl'
                        }
                    }
                });

            localStorageServiceProvider
                .setPrefix('railroad')
                .setStorageType('localStorage');
        },

    ]);

    angular.element(document).ready(function() {
    angular.bootstrap(document, ['railroad']);
});
