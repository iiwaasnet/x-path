angular.module('xpa').service('ImageCropProviders', [function(){
    var service = this;
    var providers = {};

    service.register = function(provider){
        if(providers[provider.id]){
            throw 'Provider with id:' + provider.id + ' already registered!';
        }
        providers[provider.id] = provider;
    };

    service.unregister = function(provider){
        delete providers[provider.id];
    };

    service.find = function(providerId){
        return providers[providerId];
    }

    service.all = function(){
        var tmp = new Array();
        for(key in providers){
            tmp.push(providers[key]);
        }

        return tmp;
    };
}]);