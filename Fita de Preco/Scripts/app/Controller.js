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

            toastr["success"]("Plano de Pagamento Bloqueado com sucesso!", "PLANO DE PAGAMENTO - CALISTO");

        } else if (!$scope.planoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoPlano = CodigoPlano;
            casa.PlanoBloqueado = "F";

            monitorService.BloquearPlano(casa);

            toastr["warning"]("Plano de Pagamento Desbloqueado com sucesso!", "PLANO DE PAGAMENTO - CALISTO");

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

    //variaveis utilizadas no Controller cardieselCtrl
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

            toastr["success"]("Custo Bloqueado com sucesso!", "CUSTO - CARDIESEL");

        } else if (!$scope.custoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "F";

            monitorService.BloquearCusto(casa);

            toastr["warning"]("Custo Desbloqueado com sucesso!", "CUSTO - CARDIESEL");
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

            toastr["success"]("Desconto Mínimo Bloqueado com sucesso!", "DESCONTO MÍNIMO - CARDIESEL");

        } else if (!$scope.descMinBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "F";
            casa.ValorMin = "0.00";

            monitorService.BloquearDescMin(casa);

            toastr["warning"]("Desconto Mínimo Desbloqueado com sucesso!", "DESCONTO MÍNIMO - CARDIESEL");
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

            toastr["success"]("Plano de Pagamento Bloqueado com sucesso!", "PLANO DE PAGAMENTO - CARDIESEL");

        } else if (!$scope.planoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoPlano = CodigoPlano;
            casa.PlanoBloqueado = "F";

            monitorService.BloquearPlano(casa);

            toastr["warning"]("Plano de Pagamento Desbloqueado com sucesso!", "PLANO DE PAGAMENTO - CARDIESEL");

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

                if (item.CodEmpresa == "930") {

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
    *Temporizador para atualizar de 3 em 3 segundos
    */
    $scope.atualizaCasa = function () {

        $interval(function () {

            $scope.obterStatus();

        }, 3000);

    };


}]);

/*
* CONTROLLER REDE MINEIRA
*/
app.controller('redeCtrl', ['$scope', 'monitorService', 'Casa', '$interval', function ($scope, monitorService, Casa, $interval) {

    //variaveis utilizadas no Controller redeCtrl
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

            toastr["success"]("Custo Bloqueado com sucesso!", "CUSTO - REDE MINEIRA");

        } else if (!$scope.custoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "F";

            monitorService.BloquearCusto(casa);

            toastr["warning"]("Custo Desbloqueado com sucesso!", "CUSTO - REDE MINEIRA");
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

            toastr["success"]("Desconto Mínimo Bloqueado com sucesso!", "DESCONTO MÍNIMO - REDE MINEIRA");

        } else if (!$scope.descMinBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "F";
            casa.ValorMin = "0.00";

            monitorService.BloquearDescMin(casa);

            toastr["warning"]("Desconto Mínimo Desbloqueado com sucesso!", "DESCONTO MÍNIMO - REDE MINEIRA");
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

            toastr["success"]("Plano de Pagamento Bloqueado com sucesso!", "PLANO DE PAGAMENTO - REDE MINEIRA");

        } else if (!$scope.planoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoPlano = CodigoPlano;
            casa.PlanoBloqueado = "F";

            monitorService.BloquearPlano(casa);

            toastr["warning"]("Plano de Pagamento Desbloqueado com sucesso!", "PLANO DE PAGAMENTO - REDE MINEIRA");

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

                if (item.CodEmpresa == "930") {

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
    *Temporizador para atualizar de 3 em 3 segundos
    */
    $scope.atualizaCasa = function () {

        $interval(function () {

            $scope.obterStatus();

        }, 3000);

    };


}]);

/*
* CONTROLLER POSTO IMPERIAL
*/
app.controller('postoCtrl', ['$scope', 'monitorService', 'Casa', '$interval', function ($scope, monitorService, Casa, $interval) {

    //variaveis utilizadas no Controller postoCtrl
    $scope.custoBloqueado = true;
    $scope.custoBloqueadoF = true;

    $scope.descMinBloqueado = true;
    $scope.descMinBloqueadoF = true;

    $scope.valorDescMin = "R$51,00";
    $scope.valorDescMinF = "R$51,00";

    $scope.planoBloqueado = true;
    $scope.NomeEmpresa = "";

    /*
     *Bloqueando as vendas abaixo de custo
     */
    $scope.bloquearCusto = function (CodigoEmpresa, CodigoLocal) {

        //criando o objeto casa atraves da Factory - "custo" Tipo custo
        var casa = new Casa("custo");

        if ($scope.custoBloqueado || $scope.custoBloqueadoF) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "V";

            monitorService.BloquearCusto(casa);

            toastr["success"]("Custo Bloqueado com sucesso!", "CUSTO - POSTO IMPERIAL");

        } else if (!$scope.custoBloqueado || !$scope.custoBloqueadoF) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "F";

            monitorService.BloquearCusto(casa);

            toastr["warning"]("Custo Desbloqueado com sucesso!", "CUSTO - POSTO IMPERIAL");
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

        if ($scope.descMinBloqueado || $scope.descMinBloqueadoF) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "V";
            casa.ValorMin = "51.00";

            monitorService.BloquearDescMin(casa);

            toastr["success"]("Desconto Mínimo Bloqueado com sucesso!", "DESCONTO MÍNIMO - POSTO IMPERIAL");

        } else if (!$scope.descMinBloqueado || !$scope.descMinBloqueadoF) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "F";
            casa.ValorMin = "0.00";

            monitorService.BloquearDescMin(casa);

            toastr["warning"]("Desconto Mínimo Desbloqueado com sucesso!", "DESCONTO MÍNIMO - POSTO IMPERIAL");
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

            toastr["success"]("Plano de Pagamento Bloqueado com sucesso!", "PLANO DE PAGAMENTO - POSTO IMPERIAL");

        } else if (!$scope.planoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoPlano = CodigoPlano;
            casa.PlanoBloqueado = "F";

            monitorService.BloquearPlano(casa);

            toastr["warning"]("Plano de Pagamento Desbloqueado com sucesso!", "PLANO DE PAGAMENTO - POSTO IMPERIAL");

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

                if (item.CodEmpresa == "2890") {

                   //scope.NomeEmpresa = item.NomeEmpresa;

                    if (item.VendaAbaixoCusto == "V") {                     

                        if (item.Local == "0"){

                            $scope.custoBloqueado = true;

                        } else if (item.Local == "1"){

                            $scope.custoBloqueadoF = true;

                        }

                    } else {                        

                        if (item.Local == "0") {

                            $scope.custoBloqueado = false;

                        } else if (item.Local == "1") {

                            $scope.custoBloqueadoF = false;

                        }

                    }

                    if (item.DescontoMinimo == "V") {                        

                        if (item.Local == "0") {

                            $scope.descMinBloqueado = true;
                            $scope.valorDescMin = item.ValorDescMinimo;

                        } else if (item.Local == "1") {

                            $scope.descMinBloqueadoF = true;
                            $scope.valorDescMinF = item.ValorDescMinimo;

                        }

                    } else {                        

                        if (item.Local == "0") {

                            $scope.descMinBloqueado = false;
                            $scope.valorDescMin = item.ValorDescMinimo; 

                        } else if (item.Local == "1") {

                            $scope.descMinBloqueadoF = false;
                            $scope.valorDescMinF = item.ValorDescMinimo;

                        }

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
    *Temporizador para atualizar de 3 em 3 segundos
    */
    $scope.atualizaCasa = function () {

        $interval(function () {

            $scope.obterStatus();

        }, 3000);

    };


}]);

/*
* CONTROLLER AUTO SETE
*/
app.controller('autoCtrl', ['$scope', 'monitorService', 'Casa', '$interval', function ($scope, monitorService, Casa, $interval) {

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

            toastr["success"]("Custo Bloqueado com sucesso!", "CUSTO - AUTO SETE");

        } else if (!$scope.custoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "F";

            monitorService.BloquearCusto(casa);

            toastr["warning"]("Custo Desbloqueado com sucesso!", "CUSTO - AUTO SETE");
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

            toastr["success"]("Desconto Mínimo Bloqueado com sucesso!", "DESCONTO MÍNIMO - AUTO SETE");

        } else if (!$scope.descMinBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "F";
            casa.ValorMin = "0.00";

            monitorService.BloquearDescMin(casa);

            toastr["warning"]("Desconto Mínimo Desbloqueado com sucesso!", "DESCONTO MÍNIMO - AUTO SETE");
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

            toastr["success"]("Plano de Pagamento Bloqueado com sucesso!", "PLANO DE PAGAMENTO - AUTO SETE");

        } else if (!$scope.planoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoPlano = CodigoPlano;
            casa.PlanoBloqueado = "F";

            monitorService.BloquearPlano(casa);

            toastr["warning"]("Plano de Pagamento Desbloqueado com sucesso!", "PLANO DE PAGAMENTO - AUTO SETE");

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

                if (item.CodEmpresa == "1200") {

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
    *Temporizador para atualizar de 3 em 3 segundos
    */
    $scope.atualizaCasa = function () {

        $interval(function () {

            $scope.obterStatus();

        }, 3000);

    };


}]);

/*
* CONTROLLER GOIÁS
*/
app.controller('goiasCtrl', ['$scope', 'monitorService', 'Casa', '$interval', function ($scope, monitorService, Casa, $interval) {

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

            toastr["success"]("Custo Bloqueado com sucesso!", "CUSTO - GOIÁS");

        } else if (!$scope.custoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "F";

            monitorService.BloquearCusto(casa);

            toastr["warning"]("Custo Desbloqueado com sucesso!", "CUSTO - GOIÁS");
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

            toastr["success"]("Desconto Mínimo Bloqueado com sucesso!", "DESCONTO MÍNIMO - GOIÁS");

        } else if (!$scope.descMinBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "F";
            casa.ValorMin = "0.00";

            monitorService.BloquearDescMin(casa);

            toastr["warning"]("Desconto Mínimo Desbloqueado com sucesso!", "DESCONTO MÍNIMO - GOIÁS");
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

            toastr["success"]("Plano de Pagamento Bloqueado com sucesso!", "PLANO DE PAGAMENTO - GOIÁS");

        } else if (!$scope.planoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoPlano = CodigoPlano;
            casa.PlanoBloqueado = "F";

            monitorService.BloquearPlano(casa);

            toastr["warning"]("Plano de Pagamento Desbloqueado com sucesso!", "PLANO DE PAGAMENTO - GOIÁS");

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

                if (item.CodEmpresa == "2630") {

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
    *Temporizador para atualizar de 3 em 3 segundos
    */
    $scope.atualizaCasa = function () {

        $interval(function () {

            $scope.obterStatus();

        }, 3000);

    };


}]);

/*
* CONTROLLER UBERLANDIA
*/
app.controller('uberCtrl', ['$scope', 'monitorService', 'Casa', '$interval', function ($scope, monitorService, Casa, $interval) {

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

            toastr["success"]("Custo Bloqueado com sucesso!", "CUSTO - UBERLANDIA");

        } else if (!$scope.custoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "F";

            monitorService.BloquearCusto(casa);

            toastr["warning"]("Custo Desbloqueado com sucesso!", "CUSTO - UBERLANDIA");
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

            toastr["success"]("Desconto Mínimo Bloqueado com sucesso!", "DESCONTO MÍNIMO - UBERLANDIA");

        } else if (!$scope.descMinBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "F";
            casa.ValorMin = "0.00";

            monitorService.BloquearDescMin(casa);

            toastr["warning"]("Desconto Mínimo Desbloqueado com sucesso!", "DESCONTO MÍNIMO - UBERLANDIA");
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

            toastr["success"]("Plano de Pagamento Bloqueado com sucesso!", "PLANO DE PAGAMENTO - UBERLANDIA");

        } else if (!$scope.planoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoPlano = CodigoPlano;
            casa.PlanoBloqueado = "F";

            monitorService.BloquearPlano(casa);

            toastr["warning"]("Plano de Pagamento Desbloqueado com sucesso!", "PLANO DE PAGAMENTO - UBERLANDIA");

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

                if (item.CodEmpresa == "2620") {

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
    *Temporizador para atualizar de 3 em 3 segundos
    */
    $scope.atualizaCasa = function () {

        $interval(function () {

            $scope.obterStatus();

        }, 3000);

    };


}]);

/*
* CONTROLLER VALADARES
*/
app.controller('valadaresCtrl', ['$scope', 'monitorService', 'Casa', '$interval', function ($scope, monitorService, Casa, $interval) {

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

            toastr["success"]("Custo Bloqueado com sucesso!", "CUSTO - VALADARES");

        } else if (!$scope.custoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "F";

            monitorService.BloquearCusto(casa);

            toastr["warning"]("Custo Desbloqueado com sucesso!", "CUSTO - VALADARES");
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

            toastr["success"]("Desconto Mínimo Bloqueado com sucesso!", "DESCONTO MÍNIMO - VALADARES");

        } else if (!$scope.descMinBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "F";
            casa.ValorMin = "0.00";

            monitorService.BloquearDescMin(casa);

            toastr["warning"]("Desconto Mínimo Desbloqueado com sucesso!", "DESCONTO MÍNIMO - VALADARES");
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

            toastr["success"]("Plano de Pagamento Bloqueado com sucesso!", "PLANO DE PAGAMENTO - VALADARES");

        } else if (!$scope.planoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoPlano = CodigoPlano;
            casa.PlanoBloqueado = "F";

            monitorService.BloquearPlano(casa);

            toastr["warning"]("Plano de Pagamento Desbloqueado com sucesso!", "PLANO DE PAGAMENTO - VALADARES");

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

                if (item.CodEmpresa == "260") {

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
    *Temporizador para atualizar de 3 em 3 segundos
    */
    $scope.atualizaCasa = function () {

        $interval(function () {

            $scope.obterStatus();

        }, 3000);

    };


}]);

/*
* CONTROLLER MONTES CLAROS
*/
app.controller('mocCtrl', ['$scope', 'monitorService', 'Casa', '$interval', function ($scope, monitorService, Casa, $interval) {

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

            toastr["success"]("Custo Bloqueado com sucesso!", "CUSTO - MONTES CLAROS");

        } else if (!$scope.custoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "F";

            monitorService.BloquearCusto(casa);

            toastr["warning"]("Custo Desbloqueado com sucesso!", "CUSTO - MONTES CLAROS");
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

            toastr["success"]("Desconto Mínimo Bloqueado com sucesso!", "DESCONTO MÍNIMO - MONTES CLAROS");

        } else if (!$scope.descMinBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoLocal = CodigoLocal;
            casa.Bloqueado = "F";
            casa.ValorMin = "0.00";

            monitorService.BloquearDescMin(casa);

            toastr["warning"]("Desconto Mínimo Desbloqueado com sucesso!", "DESCONTO MÍNIMO - MONTES CLAROS");
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

            toastr["success"]("Plano de Pagamento Bloqueado com sucesso!", "PLANO DE PAGAMENTO - MONTES CLAROS");

        } else if (!$scope.planoBloqueado) {

            casa.CodigoEmpresa = CodigoEmpresa;
            casa.CodigoPlano = CodigoPlano;
            casa.PlanoBloqueado = "F";

            monitorService.BloquearPlano(casa);

            toastr["warning"]("Plano de Pagamento Desbloqueado com sucesso!", "PLANO DE PAGAMENTO - MONTES CLAROS");

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

                if (item.CodEmpresa == "3140") {

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
    *Temporizador para atualizar de 3 em 3 segundos
    */
    $scope.atualizaCasa = function () {

        $interval(function () {

            $scope.obterStatus();

        }, 3000);

    };


}]);

app.controller("tudoCtrl", function ($scope, monitorService) {


    $scope.bloqueiaTudo = function () {

        monitorService.BloquearTudo();

        toastr["success"]("Tudo Bloqueado!!!", "DTI - GRUPO VDL");
    };

});