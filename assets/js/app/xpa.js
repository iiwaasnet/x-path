/**
 * Created by iiwaasnet on 24.05.2014.
 */

angular.module('xpa', []);


angular.module('xpa').controller('HomeController', function(){
    this.person = new Person();
    this.person.firstName = 'Frank';
    this.person.lastName = 'Musterman';
    this.person.age = 40;
});