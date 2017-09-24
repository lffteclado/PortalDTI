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
});