'use strict';

app.service('estacaoService',['$http','$log','utilService',function($http, $log, utilService) {
	this.getEstacaoList = function() {		
		return $http.get(utilService.getUrlServidor() + '/index.php?r=frontend/front/lista-de-estacoes');
	};			

} ]);