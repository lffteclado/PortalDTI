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
app.controller('vadieselCtrl', ['$scope', 'monitorService', 'Casa', '$interval', function ($scope, monitorService, Casa, $interval) {

    //variaveis utilizadas no Controller vadieselCtrl
    $scope.custoBloqueado = true;
    $scope.descMinBloqueado = true;
    $scope.planoBloqueado = true;
    $scope.valorDescMin = "R$51,00";
    $scope.NomeEmpresa = "";

    /*
    *Bloqueando as vendas abaixo de custo
    */
    $scope.bloquearCusto = function (CodigoEmpresa, CodigoLocal) {

        //criando o objeto casa atraves da Factory - "custo" Tipo custo
        var casa = new Casa("custo");

        if ($scope.custoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "V";

            monitorService.BloquearCusto(casa);

            toastr["success"]("Custo Bloqueado com sucesso!", "CUSTO - VADIESEL");

        } else if (!$scope.custoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "F";

            monitorService.BloquearCusto(casa);

            toastr["warning"]("Custo Desbloqueado com sucesso!", "CUSTO - VADIESEL");
        } else {

            toastr["error"]("Erro ao tentar bloquear ou desbloquear o Custo!", "DTI - Grupo VDL");
        }
    };

    /*
    *Bloqueando o Desconto Minimo
    */
    $scope.bloquearDescMin = function (CodigoEmpresa, CodigoLocal) {

        //criando o objeto casa atraves da Factory - "desc" Desconto Minimo
        var casa = new Casa("desc");

        if ($scope.descMinBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "V";
            casa.ValorMin = "51.00";

            monitorService.BloquearDescMin(casa);

            toastr["success"]("Desconto Mínimo Bloqueado com sucesso!", "DESCONTO MÍNIMO - VADIESEL");

        } else if (!$scope.descMinBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "F";
            casa.ValorMin = "0.00";

            monitorService.BloquearDescMin(casa);

            toastr["warning"]("Desconto Mínimo Desbloqueado com sucesso!", "DESCONTO MÍNIMO - VADIESEL");
        } else {

            toastr["error"]("Erro ao tentar bloquear ou desbloquear o Desconto Mínimo!", "DTI - Grupo VDL");
        }

    };

    /*
    *Bloquando o Plano de Pagamento
    */
    $scope.bloquearPlano = function (CodigoEmpresa, CodigoPlano) {

        //criando o objeto casa atraves da Factory - "plano" Plano de Pagamento
        var casa = new Casa("plano");

        if ($scope.planoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoPlano = CodigoPlano;
            casa.PlanoBloqueado = "V";

            monitorService.BloquearPlano(casa);

            toastr["success"]("Plano de Pagamento Bloqueado com sucesso!", "PLANO DE PAGAMENTO - VADIESEL");

        } else if (!$scope.planoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoPlano = CodigoPlano;
            casa.PlanoBloqueado = "F";

            monitorService.BloquearPlano(casa);

            toastr["warning"]("Plano de Pagamento Desbloqueado com sucesso!", "PLANO DE PAGAMENTO - VADIESEL");

        } else {

            toastr["error"]("Erro ao tentar bloquear ou desbloquear o Plano de Pagamento!", "DTI - Grupo VDL");
        }

    };

    /*
    *Atualizando os checkbox com o status da casa
    */
    $scope.obterStatus = function () {

        var casasData = monitorService.ObterCasas();

        casasData.then(function (casa) {

            var casas = casa.data;

            $.each(casas, function (i, item) {

                if (item.CodEmpresa == "130") {

                    $scope.NomeEmpresa = item.NomeEmpresa;

                    if (item.VendaAbaixoCusto == "V") {

                        $scope.custoBloqueado = true;

                        //toastr["success"]("Custo Bloqueado com sucesso!", "CUSTO - VADIESEL");

                    } else {

                        $scope.custoBloqueado = false;

                        //toastr["warning"]("Custo Desbloqueado com sucesso!", "CUSTO - VADIESEL");
                    }

                    if (item.DescontoMinimo == "V") {

                        $scope.descMinBloqueado = true;
                        $scope.valorDescMin = item.ValorDescMinimo;

                    } else {

                        $scope.descMinBloqueado = false;
                        $scope.valorDescMin = item.ValorDescMinimo;
                    }

                    if (item.PlanoBloqueio == "V") {

                        $scope.planoBloqueado = true;

                    } else {

                        $scope.planoBloqueado = false;

                    }
                }
            });

        }, function () {

            toastr["error"]("Erro ao obter os Registros!", "DTI - Grupo VDL");
        });

    };

    /*
    *Temporizador para atualizar de 3 em 3 minutos
    */
    $scope.atualizaCasa = function () {

        $interval(function () {

            $scope.obterStatus();

        }, 3000);

    };

}]);

/*
* CONTROLLER CALISTO
*/
app.controller('calistoCtrl', ['$scope', 'monitorService', 'Casa', '$interval', function ($scope, monitorService, Casa, $interval) {

    //variaveis utilizadas no Controller calistoCtrl
    $scope.custoBloqueado = true;
    $scope.descMinBloqueado = true;
    $scope.planoBloqueado = true;
    $scope.valorDescMin = "R$51,00";
    $scope.NomeEmpresa = "";

    /*
     *Bloqueando as vendas abaixo de custo
     */
    $scope.bloquearCusto = function (CodigoEmpresa, CodigoLocal) {

        //criando o objeto casa atraves da Factory - "custo" Tipo custo
        var casa = new Casa("custo");

        if ($scope.custoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "V";

            monitorService.BloquearCusto(casa);

            toastr["success"]("Custo Bloqueado com sucesso!", "CUSTO - CALISTO");

        } else if (!$scope.custoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "F";

            monitorService.BloquearCusto(casa);

            toastr["warning"]("Custo Desbloqueado com sucesso!", "CUSTO - CALISTO");
        } else {

            toastr["error"]("Erro ao tentar bloquear ou desbloquear o Custo!", "DTI - Grupo VDL");
        }
    };

    /*
   *Bloqueando o Desconto Minimo
   */
    $scope.bloquearDescMin = function (CodigoEmpresa, CodigoLocal) {

        //criando o objeto casa atraves da Factory - "desc" Desconto Minimo
        var casa = new Casa("desc");

        if ($scope.descMinBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "V";
            casa.ValorMin = "51.00";

            monitorService.BloquearDescMin(casa);

            toastr["success"]("Desconto Mínimo Bloqueado com sucesso!", "DESCONTO MÍNIMO - CALISTO");

        } else if (!$scope.descMinBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "F";
            casa.ValorMin = "0.00";

            monitorService.BloquearDescMin(casa);

            toastr["warning"]("Desconto Mínimo Desbloqueado com sucesso!", "DESCONTO MÍNIMO - CALISTO");
        } else {

            toastr["error"]("Erro ao tentar bloquear ou desbloquear o Desconto Mínimo!", "DTI - Grupo VDL");
        }

    };

    /*
    *Bloquando o Plano de Pagamento
    */
    $scope.bloquearPlano = function (CodigoEmpresa, CodigoPlano) {

        //criando o objeto casa atraves da Factory - "plano" Plano de Pagamento
        var casa = new Casa("plano");

        if ($scope.planoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoPlano = CodigoPlano;
            casa.PlanoBloqueado = "V";

            monitorService.BloquearPlano(casa);

            toastr["success"]("Plano de Pagamento Bloqueado com sucesso!", "PLANO DE PAGAMENTO - VADIESEL");

        } else if (!$scope.planoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoPlano = CodigoPlano;
            casa.PlanoBloqueado = "F";

            monitorService.BloquearPlano(casa);

            toastr["warning"]("Plano de Pagamento Desbloqueado com sucesso!", "PLANO DE PAGAMENTO - VADIESEL");

        } else {

            toastr["error"]("Erro ao tentar bloquear ou desbloquear o Plano de Pagamento!", "DTI - Grupo VDL");
        }

    };

    /*
   *Atualizando os checkbox com o status da casa
   */
    $scope.obterStatus = function () {

        var casasData = monitorService.ObterCasas();

        casasData.then(function (casa) {

            var casas = casa.data;

            $.each(casas, function (i, item) {

                if (item.CodEmpresa == "262") {

                    $scope.NomeEmpresa = item.NomeEmpresa;

                    if (item.VendaAbaixoCusto == "V") {

                        $scope.custoBloqueado = true;

                    } else {

                        $scope.custoBloqueado = false;

                    }

                    if (item.DescontoMinimo == "V") {

                        $scope.descMinBloqueado = true;
                        $scope.valorDescMin = item.ValorDescMinimo;

                    } else {

                        $scope.descMinBloqueado = false;
                        $scope.valorDescMin = item.ValorDescMinimo;

                    }

                    if (item.PlanoBloqueio == "V") {

                        $scope.planoBloqueado = true;

                    } else {

                        $scope.planoBloqueado = false;

                    }
                }
            });

        }, function () {

            toastr["error"]("Erro ao obter os Registros!", "DTI - Grupo VDL");
        });

    };

    /*
    *Temporizador para atualizar de 3 em 3 minutos
    */
    $scope.atualizaCasa = function () {

        $interval(function () {

            $scope.obterStatus();

        }, 3000);

    };

}]);

/*
* CONTROLLER CARDIESEL
*/

app.controller('cardieselCtrl', ['$scope', 'monitorService', 'Casa', '$interval', function ($scope, monitorService, Casa, $interval) {

    //variaveis utilizadas no Controller vadieselCtrl
    $scope.custoBloqueado = true;
    $scope.descMinBloqueado = true;
    $scope.planoBloqueado = true;
    $scope.valorDescMin = "R$51,00";
    $scope.NomeEmpresa = "";

    /*
     *Bloqueando as vendas abaixo de custo
     */
    $scope.bloquearCusto = function (CodigoEmpresa, CodigoLocal) {

        //criando o objeto casa atraves da Factory - "custo" Tipo custo
        var casa = new Casa("custo");

        if ($scope.custoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "V";

            monitorService.BloquearCusto(casa);

            toastr["success"]("Custo Bloqueado com sucesso!", "CUSTO - VADIESEL");

        } else if (!$scope.custoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "F";

            monitorService.BloquearCusto(casa);

            toastr["warning"]("Custo Desbloqueado com sucesso!", "CUSTO - VADIESEL");
        } else {

            toastr["error"]("Erro ao tentar bloquear ou desbloquear o Custo!", "DTI - Grupo VDL");
        }
    };

}]);
