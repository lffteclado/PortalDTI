app.service("monitorService", function ($http) {

    //Obter todas as casas
    this.ObterCasas = function () {

        return $http.get("/api/v1/public/statusPlanos");


    }

    //Bloquear Custo
    this.BloquearCusto = function (casa) {

        $http.post('/api/v1/public/custo', casa);
         
    }
});