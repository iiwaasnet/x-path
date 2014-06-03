/**
 * Created by iiwaasnet on 01.06.2014.
 */
angular.module('xpa').service('ImageCrop', [function(){
    this.Crop = function(element){
        var canvas = angular.element('<canvas></canvas>')[0];
        var ctx = canvas.getContext('2d');
    };
}]);