app.factory('Casa', function () {
    
    var Casa = function (tipo) {

        switch (tipo) {

            case "custo":

                this.CodigoEmpresa = 0;
                this.CodigoLocal = 0;
                this.Bloqueado = "V";

                break;

            case "desc":

                this.CodigoEmpresa = 930;
                this.CodigoLocal = 0;
                this.Bloqueado = "V";
                this.ValorMin = "51.00";

                break;

            case "plano":

                this.CodigoEmpresa = 930;
                this.CodigoPlano = 526;
                this.PlanoBloqueado = "V";

                break;

            default:
                this.CodigoEmpresa = 0;
                break;

        }
    }

    return Casa;

});