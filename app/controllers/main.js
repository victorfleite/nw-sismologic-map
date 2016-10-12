'use strict';

app.controller('mainController', ['$rootScope', '$scope', '$log', '$translate', '$location', '$q', '$filter', '$interval', '$routeParams', 'ModalService', 'popUpService', 'eventService', 'CONSTANTES', 'LOADER', function ($rootScope, $scope, $log, $translate, $location, $q, $filter, $interval, $routeParams, modalService, popUpService, eventService, CONSTANTES, LOADER) {

        // Variaveis Gerais da Aplicação 

        // Variaveis Locais
        $rootScope.loader = LOADER.LOADING_CLASS;

        $scope.host = $location.host();
        $scope.protocol = $location.protocol();

        $scope.events = [];
        $scope.iconYellow = {
            "image": {
                "icon": {
                    "anchor": [0.5, 1],
                    "anchorXUnits": "fraction",
                    "anchorYUnits": "fraction",
                    "opacity": 0.50,
                    "src": "img/marker-yellow.png"
                }
            }
        };
        $scope.iconOrange = {
            "image": {
                "icon": {
                    "anchor": [0.5, 1],
                    "anchorXUnits": "fraction",
                    "anchorYUnits": "fraction",
                    "opacity": 0.50,
                    "src": "img/marker-orange.png"
                }
            }
        };
        $scope.iconRed = {
            "image": {
                "icon": {
                    "anchor": [0.5, 1],
                    "anchorXUnits": "fraction",
                    "anchorYUnits": "fraction",
                    "opacity": 0.50,
                    "src": "img/marker-red.png"
                }
            }
        };
        // Map Config Variables 
        $scope.mapCenterConfig = {"center": {"lat": -14.9, "lon": -59.5, "zoom": 4}};
        $scope.mapCenterConfigOriginal = {};


        /** 
         * Inicializa serviços de dados
         */
        $scope.initialize = function () {
            $rootScope.loader = LOADER.LOADED_CLASS;
            var events = eventService.getEventList();
            $scope.events = events.earthquakes;
            $log.log($scope.events);
        }
        $scope.getIcon = function (magnitude) {
            var value = parseFloat(magnitude);
            var src = "./img/";
            var iconColor = 'yellow';
            if (value > 3 && value < 4) {
                return src+"marker-orange.png";
            }
            if (value > 4) {
                return src+"marker-red.png";
            }
            return src+"marker-yellow.png";
        }

        /**
         * Set as configurações Iniciais do mapa (centro, wms)
         */
        $scope.resetMap = function () {
            $scope.mapCenterConfig = $scope.mapCenterConfigOriginal;
        }

        /**
         * Verificar se a lingua passada é a mesma setada na aplicação
         */
        $scope.isLanguageSetted = function (key) {
            if ($translate.use() == key)
                return true;
            return false;
        }
        /**
         * Modificar Lingua
         */
        $scope.changeLanguage = function (key) {
            $translate.use(key);
        };
        /**
         * Abrir Modal de Alertas
         */
        $scope.openModalAlert = function (evento) {

            popUpService.showSingletonModal({
                templateUrl: CONSTANTES.VIEW_FOLDER + '/views/modalAlert.html',
                controller: "ModalAlertController",
                inputs: {
                    'evento': evento
                }
            }, function (modal) {
                modal.close.then(function (result) {

                });
            }
            );

        }

        /**
         * Abrir Modal de About
         */
        $scope.openModalAbout = function () {

            popUpService.showSingletonModal({
                templateUrl: CONSTANTES.VIEW_FOLDER + '/views/modal-about/modalAbout_' + $translate.use() + '.html',
                controller: "ModalComumController",
                inputs: {
                    'transfer': {}
                }
            }, function (modal) {
                modal.close.then(function (result) {

                });
            }
            );

        }

        /**
         * Abrir Modal de Terms
         */
        $scope.openModalTerms = function () {

            popUpService.showSingletonModal({
                templateUrl: CONSTANTES.VIEW_FOLDER + '/views/modal-terms/modalTerms_' + $translate.use() + '.html',
                controller: "ModalComumController",
                inputs: {
                    'transfer': {}
                }
            }, function (modal) {
                modal.close.then(function (result) {

                });
            }
            );

        }
        /**
         * Abrir Modal de Contact
         */
        $scope.openModalContact = function () {

            popUpService.showSingletonModal({
                templateUrl: CONSTANTES.VIEW_FOLDER + '/views/modal-contact/modalContact_' + $translate.use() + '.html',
                controller: "ModalComumController",
                inputs: {
                    'transfer': {}
                }
            }, function (modal) {
                modal.close.then(function (result) {

                });
            }
            );

        }
        /**
         * Abrir Modal de Cobrades
         */
        $scope.openModalLegenda = function () {

            popUpService.showSingletonModal({
                templateUrl: CONSTANTES.VIEW_FOLDER + '/views/modalLegenda.html',
                controller: "ModalComumController",
                inputs: {
                    'transfer': {
                        'codarService': codarService,
                        'codares': $scope.codares
                    },
                }
            }, function (modal) {
                modal.close.then(function (result) {

                });
            }
            );

        }
        /**
         * Aparecer Div Help
         */
        $scope.openHelp = function () {
            $scope.helpClass = 'help-' + $translate.use();
        }
        /**
         * Fechar Div Help
         */
        $scope.closeHelp = function () {
            $scope.helpClass = '';

        }

        /**
         * Seta Emergencias que serão apresentadas no mapa de acordo com tab selecionada ou a emergencia passada.
         */
        $scope.setEmergenciasSelecionadas = function (emergencias) {
            if (!emergencias) {
                switch ($scope.tabSelected) {
                    case 'hoje':
                        $scope.emergenciasSelecionadas = angular.copy($scope.eventosHoje);
                        break;
                    case 'amanha':
                        $scope.emergenciasSelecionadas = angular.copy($scope.eventosAmanha);
                        break;
                    case 'futuro':
                        $scope.emergenciasSelecionadas = angular.copy($scope.eventosFuturos);
                        break;
                }
            } else {
                $scope.emergenciasSelecionadas = emergencias;
            }
        }

        /**
         * Agrupar Array de Emergencias Por Local
         */
        $scope.agruparEmergenciasPorLocal = function (eventos) {

            var existeKeyUf = function (arr, uf) {
                for (var j = 0; j < arr.length; j++) {
                    if (arr[j].uf == uf)
                        return j;
                }
                return undefined;
            }

            var locais = [];
            for (i = 0; i < eventos.length; i++) {
                angular.forEach(eventos[i].ufsAtingidas, function (item, key) {
                    var index = existeKeyUf(locais, item.uf);
                    if (index !== undefined) {
                        locais[index].emergencias.push(eventos[i]);
                    } else {
                        var o = {'uf': item.uf, 'emergencias': [eventos[i]]};
                        locais.push(o);
                    }
                });
            }
            return $filter('orderBy')(locais, 'uf');
        }
        /**
         * retorna tooltip options
         */
        $scope.setTooltipOptions = function (title, position) {
            return {'title': title, 'position': position};
        }

        /**
         * Verifica se o objeto é está vazio.
         */
        $scope.isEmpty = function (object) {
            if (angular.equals({}, object))
                return true;
            else
                return false;

        }
        /**
         * Verifica se o objeto é está vazio.
         */
        $scope.isArrayEmpty = function (arr) {
            if (arr.length == 0)
                return true;
            else
                return false;
        }

        /**
         * Looping que recarrega os dados da app.
         */
        $scope.fight = function () {
            /*var loop = $interval(function() {
             
             $scope.initialize();
             
             }, 5000);*/
        };


        /**
         *  LISTENERS DE EVENTOS SOLICITADOS POR CONTROLLERS FILHOS 
         * /
         
         
         
         
         /**
         * Listener para mudar a visibilidade do Header
         */
        $rootScope.$on('setHeaderMenuVisibility', function (event, args) {
            $scope.headerMenuVisibility = args.headerMenuVisibility;
        });


        /**
         * Listener para mudar a visibilidade do Header
         */
        $rootScope.$on('setAlertasMenuVisibility', function (event, args) {
            $scope.alertasMenuVisibility = args.alertasMenuVisibility;
        });

        /**
         * Listener que recebe solicitação de Controller filho (modal-alert.js) para setar somente a emergencia passada no mapa
         */
        $rootScope.$on('setEmergenciaOnMap', function (event, args) {
            var emergencia = args.emergencia;
            // Setar centro do mapa a partir da emergencia passada
            $scope.mapCenterConfig = emergencia.configCenterMap;
            // Setar somente a emergencia no mapa
            $scope.setEmergenciasSelecionadas([emergencia]);
        });

        /**
         * Listener que recebe solicitação de Controller filho (modal-alert.js) para setar o mapa na visao de todos os alertas a partir das tabs selecionadas.
         */
        $rootScope.$on('removeEmergenciaOnMap', function (event, args) {
            // Resetar Configuracoes de centro de mapa
            $scope.resetMap();
            // Setar somente as emergencias da tab selecionada
            $scope.setEmergenciasSelecionadas();
        });

        /**
         * Listener para eventos de Loader
         */

        $rootScope.$on('loaderEvent', function (event, args) {
            $scope.loader = args.loader;
        });



    }]);