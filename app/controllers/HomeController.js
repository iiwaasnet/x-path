angular.module('xpa').controller('HomeController', ['$document', function ($document) {
    this.person = new Person();
    this.person.firstName = 'Frank';
    this.person.lastName = 'Musterman';
    this.person.age = 40;
    this.image = {url: "http://lorempixel.com/720/520/",
        position: {
            x: 0,
            y: 0
        },
        id: 1};

    this.CropImage = function () {
//        this.person.lastName = Date();
        console.log(JSON.stringify(this.imagePosition));
    };
}]);
