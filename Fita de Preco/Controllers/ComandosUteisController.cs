﻿using Fita_de_Preco.Security;
using System.Web.Mvc;

namespace Fita_de_Preco.Controllers
{
    public class ComandosUteisController : Controller
    {
        // GET: ComandosUteis
        [AuthorizeRoles("Admin", "Dti")]
        public ActionResult Index()
        {
           
            return View();
        }

        [AuthorizeRoles("Admin","Finan")]
        public ActionResult Cardiesel()
        {
            return View();
        }

        [AuthorizeRoles("Admin", "FinanGoias")]
        public ActionResult Goias()
        {
            return View();
        }
    }
}