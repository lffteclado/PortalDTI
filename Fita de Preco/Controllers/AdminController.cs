using Fita_de_Preco.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Fita_de_Preco.Controllers.Admin
{
    public class AdminController : Controller
    {
        // GET: Admin
        [AuthorizeRoles("Admin")]
        public ActionResult Index()
        {
            return View();
        }
    }
}