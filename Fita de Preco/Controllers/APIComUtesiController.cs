using Fita_de_Preco.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Routing;

namespace Fita_de_Preco.Controllers
{
    [RoutePrefix("api/v1/public")]
    public class APIComUtesiController : ApiController
    {
        private readonly DBContexto _db = new DBContexto();

        [HttpPost]
        [Route("planos")]
        public void BloquearPlanos(Planos plano)
        {
            if (plano == null) throw new ArgumentNullException("planos");

            _db.BloquearPlanos(plano);
        }

        [HttpPost]
        [Route("custo")]
        public void BloquearAbaixoCusto(Custo custo)
        {
            if (custo == null) throw new ArgumentNullException("custo");

            _db.BloquearAbaixoCusto(custo);
        }

        [HttpPost]
        [Route("desconto")]
        public void BloquearDescMinimo(DescMinino desc)
        {
            if (desc == null) throw new ArgumentNullException("desconto");

            _db.BloquearDescMinimo(desc);
        }

        [HttpGet]
        [Route("statusPlanos")]
        public List<StatusPlanos> StatusPlanos()
        {
            List<StatusPlanos> lstPlanos = new List<StatusPlanos>();

            lstPlanos = _db.ObterPlanos();

            return lstPlanos;
        }
    }
}
