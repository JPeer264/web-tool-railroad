angular
    .module('admin.adminUserRequest')
    .directive('adminUserRequest', adminUserRequestDirective);

/**
 * @ngdoc directive
 * @name cmps.admin:adminUserRequest
 *
 * @description
 * Generates a single adminUserRequest component
 */
function adminUserRequestDirective() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: 'AdminUserRequestCtrl',
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'cmps/admin/adminUserRequest/adminUserRequest.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {

                console.log($('[data-toggle-id]'));


                $(document).on('click', '[data-toggle-id]', function (data) {
                    var toggleData = $(this).data('toggleId');
                    var $this = $(this);
                    var findById = $('#' + toggleData);
                    var slideSpeed = 500;
                    var toggleClass = 'toggled';

                    // slide up and down logic
                    // checkes class 'toggled'
                    if (!findById.hasClass(toggleClass)) {
                        findById.slideUp(slideSpeed, function () {
                            $this.find('i.fa').addClass('fa-rotate-90');
                            findById.addClass(toggleClass);
                        });
                    } else {
                        findById.slideDown(slideSpeed, function () {
                            $this.find('i.fa').removeClass('fa-rotate-90');
                            findById.removeClass(toggleClass);
                        });
                    }
                });

                $('.reveal-overlay').find('#edit-user-admin').parent().remove();
                var elem = new Foundation.Reveal($('#edit-user-admin'));
            }
        };
};
