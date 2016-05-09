angular.module('railroad', [
    'ui.router',
    'LocalStorageModule',
    'railroad.templates',
    'pages',
    'service',
    'cmps',
    'pascalprecht.translate',
    'restangular',
    'ngCookies',
    'ngMaterial',
    'tmh.dynamicLocale'
]);

angular
    .module('railroad')
    .config(config)
    .run(run)
    // cosntant COOKIE is used for the tokens
    .constant("COOKIE", {
        "TOKEN": "tkn_u", // tkn_u = token_user
        "USER_ID": "u_i", // u_i = user_id
        "PREFLANGUAGE": "p_lang",
    });

    // config method
    config.$inject = [
        '$stateProvider',
        '$locationProvider',
        '$urlRouterProvider',
        'localStorageServiceProvider',
        '$translateProvider',
        'RestangularProvider', // restangular
        '$mdThemingProvider',
        'tmhDynamicLocaleProvider'
    ];

    function config ($stateProvider, $locationProvider, $urlRouterProvider, localStorageServiceProvider, $translateProvider, RestangularProvider, $mdThemingProvider, tmhDynamicLocaleProvider) {
        // workaround to enable cookies in config
        var $cookies;

        angular.injector(['ngCookies']).invoke(['$cookies', function(_$cookies_) {
            $cookies = _$cookies_;
        }]);

        // redirect to home state when we call the page without route information
        // activate in proudction and set mod_rewrite to index.html
        // $locationProvider.html5Mode(true);

        // setup restangular basics
        RestangularProvider.setBaseUrl('http://localhost/web-tool-railroad-api/public/api/v1/')
        .setDefaultHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer '+ $cookies.get('tkn_u')
        });

        $mdThemingProvider.definePalette('railroad', {
            '50': 'FFC14E',
            '100': 'ffffff',
            '200': 'ffffff',
            '300': 'ffffff',
            '400': 'ffffff',
            '500': 'FFC14E',
            '600': 'e53935',
            '700': 'd32f2f',
            '800': 'c62828',
            '900': 'b71c1c',
            'A100': 'ff8980',
            'A200': 'ff5252',
            'A400': 'ff1744',
            'A700': 'd50000',
        });
          $mdThemingProvider.theme('default')
            .primaryPalette('railroad')

        // activate translation
        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/locale-',// path to translations files
            suffix: '.json'// suffix, currently- extension of the translations
        });
        $translateProvider.useMissingTranslationHandler(); // log if TRANSLATION_CODE not found
        $translateProvider.preferredLanguage('en-US');
        $translateProvider.fallbackLanguage('en-US');
        tmhDynamicLocaleProvider.localeLocationPattern('/i18n/angular/angular-locale_{{ locale }}.js');

        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/error');

        // setup header and footer templates
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
                    authorize: ['auth',
                        function(auth) {
                            return auth.check();
                        }
                    ]
                },
                template: '<div class="view-header" data-ui-view="header"></div><div class="row small-up-1 medium-up-1 large-up-1"><div class="view-main column" data-ui-view="main"></div></div><div class="view-footer" data-ui-view="footer"></div>'
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
                    footer: {
                        templateUrl: templates.footer.template,
                        controller: templates.footer.controller
                    },
                },
                activetab: 'home'
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
                    footer: {
                        templateUrl: templates.footer.template,
                        controller: templates.footer.controller
                    },
                },
                activetab: 'category'
            })
            .state('secure.category', {
                url: '/category/{id}',
                views: {
                    header: {
                        templateUrl: templates.header.template,
                        controller: templates.header.controller
                    },
                    main: {
                        templateUrl: 'pages/subcategory/subcategory.html',
                        controller: 'SubcategoryCtrl'
                    },
                    footer: {
                        templateUrl: templates.footer.template,
                        controller: templates.footer.controller
                    },
                },
                activetab: 'category'
            })
            .state('secure.topic', {
                url: '/topic/{id}',
                views: {
                    header: {
                        templateUrl: templates.header.template,
                        controller: templates.header.controller
                    },
                    main: {
                        templateUrl: 'pages/topic/topic.html',
                        controller: 'TopicCtrl'
                    },
                    footer: {
                        templateUrl: templates.footer.template,
                        controller: templates.footer.controller
                    },
                },
                activetab: 'category'
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
                    footer: {
                        templateUrl: templates.footer.template,
                        controller: templates.footer.controller
                    },
                },
                activetab: 'profile'
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
                    footer: {
                        templateUrl: templates.footer.template,
                        controller: templates.footer.controller
                    },
                },
                activetab: 'rules'
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
                    footer: {
                        templateUrl: templates.footer.template,
                        controller: templates.footer.controller
                    },
                },
                activetab: 'faq'
            })
            .state('landing', {
                url: '/welcome',
                views: {
                    header: {
                        templateUrl: templates.header.template,
                        controller: templates.header.controller
                    },
                    main: {
                        templateUrl: 'pages/landing/landing.html',
                        controller: 'LandingCtrl'
                    },
                    footer: {
                        templateUrl: templates.footer.template,
                        controller: templates.footer.controller
                    },
                }
            })
            .state('error', {
                url: '/error',
                views: {
                    header: {
                        templateUrl: templates.header.template,
                        controller: templates.header.controller
                    },
                    main: {
                        templateUrl: 'pages/error/error.html',
                        controller: 'ErrorCtrl'
                    },
                    footer: {
                        templateUrl: templates.footer.template,
                        controller: templates.footer.controller
                    },
                }
            });

        localStorageServiceProvider
            .setPrefix('railroad')
            .setStorageType('localStorage');
    };

    // run method
    run.$inject = [
        '$rootScope',
        '$location',
        '$http',
        'auth',
        'user',
        'Restangular',
    ];

    function run($rootScope, $location, $http, auth, user, Restangular) {
        // user.setCurrent();

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            auth.check();

            if (auth.check()) {
                user.setCurrent();
            }

            var loggedIn = auth.isAuthorized();

            // if you do not want to enable the login
            // deavticte the following 2 if
            if (!loggedIn) {
                $location.path('/welcome');
            }

            // redirect if logged in user wants to /welcome
            if (loggedIn && $location.url() == '/welcome') {
                $location.path('/');
            }
        });

        Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
            if (response.status === 401) {
                auth.logout();
            }

            if (response.status >= 300) {
                $location.path('/error');

                return false; // error handled
            }

            return true; // error not handled
        });
    }

    angular.element(document).ready(function() {
    angular.bootstrap(document, ['railroad']);
});
