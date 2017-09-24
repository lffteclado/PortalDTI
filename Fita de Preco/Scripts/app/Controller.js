//app.controller("monitorCtrl", function ($scope, monitorService) {


//    //Obter Todas as Casas
//    $scope.obterCasas = function() {

//        var casasData = descMService.ObterCasas();

//        casasData.then(function (casa) {

//            $scope.casas = casa.data;

//        }, function () {

//            toastr["error"]("Erro ao obter os Registros!", "DTI - Grupo VDL");
//        });
//    }
//});
/*
* CONTROLLER VADIESEL
*/
app.controller('vadieselCtrl', ['$scope', 'monitorService', 'Casa', function ($scope, monitorService, Casa) {

    $scope.bloqueado = true;

    $scope.casa = new Casa();

    $scope.bloquearCusto = function (CodigoEmpresa, CodigoLocal) {

        if ($scope.bloqueado) {

            $scope.casa.CodigoEmpresa = CodigoEmpresa;
            $scope.casa.CodigoLocal = CodigoLocal;
            $scope.casa.Bloqueado = "V";

            monitorService.BloquearCusto($scope.casa);

            toastr["success"]("Custo Bloqueado com sucesso!", "CUSTO - VADIESEL"); 

            var casasData = monitorService.ObterCasas();

            casasData.then(function (casa) {

                var casas = casa.data;

                $.each(casas, function (i, item){

                    console.log(item.CodEmpresa);

                });

            }, function () {

                toastr["error"]("Erro ao obter os Registros!", "DTI - Grupo VDL");
            });

        } else if (!$scope.bloqueado) {

            $scope.casa.CodigoEmpresa = CodigoEmpresa;
            $scope.casa.CodigoLocal = CodigoLocal;
            $scope.casa.Bloqueado = "F";

            monitorService.BloquearCusto($scope.casa);

            toastr["warning"]("Custo Desbloqueado com sucesso!", "CUSTO - VADIESEL");
        }
    };

    //Obter Todos os Status de Todas as Casas
    $scope.obterCasas = function() {

        var casasData = monitorService.ObterCasas();

        casasData.then(function (casa) {

            $scope.casas = casa.data;

        }, function () {

            toastr["error"]("Erro ao obter os Registros!", "DTI - Grupo VDL");
        });
    }

}]);

/*
* CONTROLLER CALISTO
*/

app.controller('calistoCtrl', ['$scope', 'monitorService', 'Casa', function ($scope, monitorService, Casa) {

    $scope.bloqueado = true;

    $scope.casa = new Casa();

    $scope.bloquearCusto = function (CodigoEmpresa, CodigoLocal) {

        if ($scope.bloqueado) {

            $scope.casa.CodigoEmpresa = CodigoEmpresa;
            $scope.casa.CodigoLocal = CodigoLocal;
            $scope.casa.Bloqueado = "V";

            monitorService.BloquearCusto($scope.casa);

            toastr["success"]("Custo Bloqueado com sucesso!", "CUSTO - CALISTO");

        } else if (!$scope.bloqueado) {

            $scope.casa.CodigoEmpresa = CodigoEmpresa;
            $scope.casa.CodigoLocal = CodigoLocal;
            $scope.casa.Bloqueado = "F";

            monitorService.BloquearCusto($scope.casa);

            toastr["warning"]("Custo Desbloqueado com sucesso!", "CUSTO - CALISTO");
        }
    };

}]);

/*
* CONTROLLER CARDIESEL
*/

app.controller('cardieselCtrl', ['$scope', 'monitorService', 'Casa', function ($scope, monitorService, Casa) {

    $scope.bloqueado = true;

    $scope.casa = new Casa();

    $scope.bloquearCusto = function (CodigoEmpresa, CodigoLocal) {

        if ($scope.bloqueado) {

            $scope.casa.CodigoEmpresa = CodigoEmpresa;
            $scope.casa.CodigoLocal = CodigoLocal;
            $scope.casa.Bloqueado = "V";

            monitorService.BloquearCusto($scope.casa);

            toastr["success"]("Custo Bloqueado com sucesso!", "CUSTO - CARDIESEL");

        } else if (!$scope.bloqueado) {

            $scope.casa.CodigoEmpresa = CodigoEmpresa;
            $scope.casa.CodigoLocal = CodigoLocal;
            $scope.casa.Bloqueado = "F";

            monitorService.BloquearCusto($scope.casa);

            toastr["warning"]("Custo Desbloqueado com sucesso!", "CUSTO - CARDIESEL");
        }
    };

}]);
