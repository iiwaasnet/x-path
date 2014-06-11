angular.module('xpa').controller('HomeController', ['$document', 'ImageCropProviders',
    function ($document, ImageCropProviders) {
    var ctrl = this;
    ctrl.person = new Person();
    ctrl.person.firstName = 'Frank';
    ctrl.person.lastName = 'Musterman';
    ctrl.person.age = 40;
    ctrl.image = {url: "http://lorempixel.com/720/520/",
        position: {
            x: 0,
            y: 0
        },
        id: 1};
    var cropProviders = [ctrl.image.id];

    ctrl.CropImage = function () {
//        this.person.lastName = Date();
        console.log(JSON.stringify(this.imagePosition));
    };

    ctrl.crop = function () {
        angular.forEach(getRegisteredProviders(), function(value){
            value.crop();
        });
    };
    ctrl.edit = function () {
        angular.forEach(getRegisteredProviders(), function(value){
            value.edit();
        });
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
