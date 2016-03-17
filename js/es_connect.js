// We define an EsConnector module that depends on the elasticsearch module.     
var EsConnector = angular.module('EsConnector', ['elasticsearch']);

// Create the es service from the esFactory
EsConnector.service('es', function (esFactory) {
  return esFactory({ host: 'localhost:9200' });
});

// We define an Angular controller that returns the server health
// Inputs: $scope and the 'es' service

EsConnector.controller('ServerHealthController', function($scope, es) {

    es.cluster.health(function (err, resp) {
        if (err) {
            $scope.data = err.message;
        } else {
            $scope.data = resp;
        }
    });
});

// We define an Angular controller that returns query results,
// Inputs: $scope and the 'es' service

EsConnector.controller('QueryController', function($scope, es) {

// search for documents
    this.queryBody = {
        qAttr: '',
        qValue: ''
    };

    this.getQuery = function(qValue){
        
        es.search({
        index: 'shakespeare',
        size: 50,
        body: {
        "query":
            {
                "match": {
                    "line_number": qValue
                }   
            },
        }
           
        }).then(function (response) {
            console.log(response);
            $scope.hits = response.hits.hits;
        });
    };
    

});