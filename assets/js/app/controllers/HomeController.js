/**
 * Created by sivasenko on 02.06.2014.
 */
angular.module('xpa').controller('HomeController', ['$document', 'ImageCrop', function ($document, ImageCrop) {
    this.person = new Person();
    this.person.firstName = 'Frank';
    this.person.lastName = 'Musterman';
    this.person.age = 40;
    this.image = "http://lorempixel.com/720/520/";
    this.imagePosition = {
        x: 0,
        y: 0
    };

    this.CropImage = function () {
        var img = $document.find('img');
        ImageCrop.Crop(img[0]);
//        this.person.lastName = Date();
        console.log(JSON.stringify(this.imagePosition));
    };
}]);
