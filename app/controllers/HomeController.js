angular.module('xpa').controller('HomeController', ['$document', '$scope',
    function ($document, $scope) {
        var ctrl = this;
        ctrl.person = new Person();
        ctrl.person.firstName = 'Frank';
        ctrl.person.lastName = 'Musterman';
        ctrl.person.age = 40;
        ctrl.images = getImages();
        var cropProviders = [];

        ctrl.CropImage = function () {
//        this.person.lastName = Date();
            console.log(JSON.stringify(this.imagePosition));
        };

        function getImages() {
            return [
                {url: "http://lorempixel.com/720/520/",
                    cropArea: {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0
                    }},
                {url: "http://lorempixel.com/720/520/",
                    cropArea: {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0
                    }}
            ];
        }

        ctrl.crop = function () {
            $scope.$broadcast('crop-image');
        };
        ctrl.edit = function () {
            $scope.$broadcast('edit-image');
        };

        function getRegisteredProviders() {
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
    }]);
