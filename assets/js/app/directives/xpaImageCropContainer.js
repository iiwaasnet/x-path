/**
 * Created by iiwaasnet on 04.06.2014.
 */
angular.module('xpa').directive('xpaImageCropContainer', function(){
    return{
        restrict: 'A',
        controller: function($scope){
            this.crop = function(){
                scope.$broadcast('crop-image');
            };
            this.edit = function(){
                scope.$broadcast('edit-image');
            };
        },
        controllerAs: 'imageCropContainerCtrl',
        link: function(scope, element, attrs){
            var button = element.find('button');
            button.on('click', function(){
                scope.$broadcast('crop-image');
            });
        }
    };
});
