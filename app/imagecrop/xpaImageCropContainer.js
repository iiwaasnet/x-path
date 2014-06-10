angular.module('xpa').directive('xpaImageCropContainer', ['ImageCropProviders', function (ImageCropProviders) {
    return{
        restrict: 'A',
        controller: function ($scope, $element, $attrs) {
            var cropProviders = $attrs.cropProviders;

            this.crop = function () {
                angular.forEach(getRegisteredProviders(), function(value){
                    value.crop();
                });
            };
            this.edit = function () {
                angular.forEach(getRegisteredProviders(), function(value){
                    value.edit();
                });
            };

            function getRegisteredProviders() {
                debugger;
                var providers = [];
                if (cropProviders.length) {
                    angular.forEach(cropProviders, function (value) {
                        var provider = ImageCropProviders.find(value);
                        if (provider) {
                            providers.push(provider);
                        }
                    });
                }
                else {
                    angular.forEach(ImageCropProviders.all(), function (value) {
                        if (value) {
                            providers.push(value);
                        }
                    });
                }

                return providers;
            }
        },
        controllerAs: 'imageCropContainerCtrl'
    };
}]);
