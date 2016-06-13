angular
	.module('pages.legalpolicy')
	.controller('LegalpolicyCtrl', LegalpolicyController);

/**
 * @ngdoc controller
 * @name pages.legalpolicy:LegalpolicyCtrl
 *
 * @requires $scope
 *
 * @description
 * LegalpolicyCtrl for the legalpolicy page
 */
LegalpolicyController.$inject = [
	'$scope',
    '$location',
    '$anchorScroll'
];

function LegalpolicyController($scope, $location, $anchorScroll) {

    var types = {
        first: 'First Party',
        second: 'Second Party',
        third: 'Third Party'
    };

    $scope.cookiesNecessary = [{
        name: 'c_a',
        description: 'A key to identify if you already accepted the cookies.',
        type: types.first
    }, {
        name: 'tkn_u',
        description: 'This stores the session id of the user and is stored at the login.',
        type: types.first
    }, {
        name: 'u_i',
        description: 'This cookie stores the user identification.',
        type: types.first
    }];

    $scope.cookiesPerformance = [{
        name: 'googtrans',
        description: 'Saved by the Google Translate Widget to save the previous used language.',
        type: types.third
    }];

    $scope.gotoAnchor = function(hash) {
        var bodyTop = $('body').css('top');
        var bodyTopHeight = parseInt(bodyTop.substr(0, bodyTop.length - 2));
        var height = $('#header').outerHeight(true);
        $anchorScroll.yOffset = (bodyTopHeight + height);

        if ($location.hash() !== hash) {
            // set the $location.hash to `newHash` and
            // $anchorScroll will automatically scroll to it
            $location.hash(hash);
        } else {
            // call $anchorScroll() explicitly,
            // since $location.hash hasn't changed
            $anchorScroll();
        }
    };

}