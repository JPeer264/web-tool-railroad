angular
    .module('forum.comment')
    .controller('CommentCtrl', CommentController);

/**
 * @ngdoc controller
 * @name cmps.forum:CommentCtrl
 *
 * @requires $scope
 *
 * @description
 * CommentCtrl for the comment directive
 */
CommentController.$inject = [
    '$scope'
];

function CommentController($scope) {
    angular.forEach($scope.comment.file, function (file, key) {
             if(file.filename.length >= 30){
                $scope.split = file.filename.split('.');
                $scope.name = $scope.split[0].slice(0, 30);
                $scope.extension = $scope.split[1];
                console.log($scope.name, $scope.extension);
                file.filename = $scope.name + "..." + $scope.extension;
             }
        });
}