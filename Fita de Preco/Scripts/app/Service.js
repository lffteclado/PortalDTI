app.service("monitorService", function ($http) {

    //Obter todas as casas
    this.ObterCasas = function () {

        return $http.get("/api/v1/public/statusPlanos");

    }

    //Bloquear Custo
    this.BloquearCusto = function (casa) {

        $http.post('/api/v1/public/custo', casa);
         
    }

    //Bloquear Custo
    this.BloquearDescMin = function (casa) {

        $http.post('/api/v1/public/desconto', casa);

    }

    //Bloquear Plano de Pagamento
    this.BloquearPlano = function (casa) {

        $http.post('/api/v1/public/planos', casa);

    }

    //Bloquear Tudo
    this.BloquearTudo = function () {

        var casasData = $http.get("/api/v1/public/statusPlanos");

        casasData.then(function (casa) {

            var casas = casa.data;

            $.each(casas, function (i, item) {
           
                //Bloquear Custo
                var custo = {

                    "CodigoEmpresa" : item.CodEmpresa,
                    "CodigoLocal" : item.Local,
                    "Bloqueado" : "V"
                }

                $http.post('/api/v1/public/custo', custo);

                //Bloquear Desconto Minimo
                var desc = {

                    "CodigoEmpresa" : item.CodEmpresa,
                    "CodigoLocal" : item.Local,
                    "Bloqueado" : "V",
                    "ValorMin" : "51.00"
                }
                
                $http.post('/api/v1/public/desconto', desc);

                //Bloquear Plano
                var plano = {

                    "CodigoEmpresa" : item.CodEmpresa,
                    "CodigoPlano" : 526,
                    "PlanoBloqueado" : "V"
                }

                $http.post('/api/v1/public/planos', plano);

            });

        }, function () {

            toastr["error"]("Erro ao realizar os serviços de bloqueio!", "DTI - Grupo VDL");
        });
    }

});