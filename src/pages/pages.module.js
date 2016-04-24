/**
* pages Module
*
* Description
*/
(function(window, angular) {
    'use strict';

    angular.module('pages', [
        'pages.home',
        'pages.header',
        'pages.landing',
        'pages.admin',
        'pages.categories',
        'pages.category',
        'pages.faq',
        'pages.profile',
        'pages.rules',
        'pages.error',
    ]);

})(window, window.angular);