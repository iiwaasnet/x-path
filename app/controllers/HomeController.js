angular.module('xpa').controller('HomeController', ['$document', function ($document) {
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
//        this.person.lastName = Date();
        console.log(JSON.stringify(this.imagePosition));
    };
}]);
