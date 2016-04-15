angular.module('railroad', [
    'ui.router',
    'LocalStorageModule',
    'railroad.templates',
    'pages',
    'service',
    'cmps',
    'pascalprecht.translate',
    'restangular',
    'angular-jwt'
]);
angular
    .module('railroad')
    .config([
        '$stateProvider',
        '$locationProvider',
        '$urlRouterProvider',
        'localStorageServiceProvider',
        '$translateProvider',
        'RestangularProvider', // restangular
        'jwtInterceptorProvider', // angular-jwt
        function($stateProvider, $locationProvider, $urlRouterProvider, localStorageServiceProvider, $translateProvider, RestangularProvider, jwtInterceptorProvider) {
            //redirect to home state when we call the page without route information
            // $locationProvider.html5Mode(true);

            // setup restangular basics
            RestangularProvider.setBaseUrl('http://localhost/web-tool-railroad-api/public/api/v1/');

            jwtInterceptorProvider

            $translateProvider.useStaticFilesLoader({
                prefix: 'i18n/locale-',// path to translations files
                suffix: '.json'// suffix, currently- extension of the translations
            })
            .useMissingTranslationHandlerLog() // log if TRANSLATION_CODE not found
            .preferredLanguage('en_US')
            .fallbackLanguage('en_US');

            $urlRouterProvider.when('', '/');
            $urlRouterProvider.otherwise('/');

            var templates = {
                header: {
                    template: 'pages/header/header.html',
                    controller: 'HeaderCtrl'
                },
                footer: {
                    template: 'pages/footer/footer.html',
                    controller: 'FooterCtrl'
                },
            }

            $stateProvider
                .state('secure', {
                    abstract: true,
                    resolve: {
                        authorize: ['authorization',
                            function(authorization) {
                                return authorization.check();
                            }
                        ]
                    },
                    template: '<div class="view-header" data-ui-view="header"></div><div class="view-main" data-ui-view="main"></div>'
                })
                .state('secure.index', {
                    url: '/',
                    views: {
                        header: {
                            templateUrl: templates.header.template,
                            controller: templates.header.controller
                        },
                        main: {
                            templateUrl: 'pages/home/home.html',
                            controller: 'HomeCtrl'
                        },
                    }
                })
                .state('secure.categories', {
                    url: '/category',
                    views: {
                        header: {
                            templateUrl: templates.header.template,
                            controller: templates.header.controller
                        },
                        main: {
                            templateUrl: 'pages/categories/categories.html',
                            controller: 'CategoriesCtrl'
                        },
                    }
                })
                .state('secure.category', {
                    url: '/category/{id}',
                    views: {
                        header: {
                            templateUrl: templates.header.template,
                            controller: templates.header.controller
                        },
                        main: {
                            templateUrl: 'pages/category/category.html',
                            controller: 'CategoryCtrl'
                        },
                    }
                })
                .state('secure.profile', {
                    url: '/user/{id}',
                    views: {
                        header: {
                            templateUrl: templates.header.template,
                            controller: templates.header.controller
                        },
                        main: {
                            templateUrl: 'pages/profile/profile.html',
                            controller: 'ProfileCtrl'
                        },
                    }
                })
                .state('secure.rules', {
                    url: '/rules',
                    views: {
                        header: {
                            templateUrl: templates.header.template,
                            controller: templates.header.controller
                        },
                        main: {
                            templateUrl: 'pages/rules/rules.html',
                            controller: 'RulesCtrl'
                        },
                    }
                })
                .state('secure.faq', {
                    url: '/faq',
                    views: {
                        header: {
                            templateUrl: templates.header.template,
                            controller: templates.header.controller
                        },
                        main: {
                            templateUrl: 'pages/faq/faq.html',
                            controller: 'FaqCtrl'
                        },
                    }
                })
                .state('landing', {
                    url: '/welcome',
                    views: {
                        header: {
                            templateUrl: 'pages/header/header.html',
                            controller: 'HeaderCtrl'
                        },
                        main: {
                            templateUrl: 'pages/landing/landing.html',
                            controller: 'LandingCtrl'
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
