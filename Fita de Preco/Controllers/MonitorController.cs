using Fita_de_Preco.Models;
using Fita_de_Preco.Security;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Fita_de_Preco.Controllers
{
    public class MonitorController : Controller
    {
        DBContexto db = new DBContexto();

        [AuthorizeRoles("Admin")]
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