'use strict';

app.controller('ModalAlertController', ['$rootScope', '$scope', '$log', '$filter', 'close', 'evento', function ($rootScope, $scope, $log, $filter, close, evento) {
        
        $scope.evento = evento;
        $log.log(evento);
        
        $scope.close = function () {
            close("Success!");
        }


    }]);