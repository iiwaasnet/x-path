angular.module('xpa').directive('xpaImageCropContainer', function(){
    return{
        restrict: 'A',
        controller: function($scope){
            this.crop = function(){
                $scope.$broadcast('crop-image');
            };
            this.edit = function(){
                $scope.$broadcast('edit-image');
            };
        },
        controllerAs: 'imageCropContainerCtrl'
    };
});
