/**
 * Created by iiwaasnet on 24.05.2014.
 */

angular.module('app', []);

angular.module('app').controller('HomeController', function(){
    this.person = new Person();
    this.person.firstName = 'Frank';
    this.person.lastName = 'Musterman';
    this.person.age = 40;
});