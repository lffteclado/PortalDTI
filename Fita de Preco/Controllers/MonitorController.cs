using Fita_de_Preco.Models;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Fita_de_Preco.Controllers
{
    public class MonitorController : Controller
    {
        DBContexto db = new DBContexto();

        [Authorize]
        public ActionResult Index()
        {
            List<StatusPlanos> lstPlanos = new List<StatusPlanos>();

            lstPlanos = db.ObterPlanos();

            if (lstPlanos == null)
            {
                return HttpNotFound();
            }

            return View(lstPlanos);
        }
    }
}