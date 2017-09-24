using Fita_de_Preco.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Fita_de_Preco.Controllers
{
    public class LoginController : Controller
    {
       
        public ActionResult Login()
        {
            return View();
        }


        // POST:
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Logar(Usuario usu)
        {
            //var usu = db.Usuarios.Where(p => p.Nome == usuario.Nome);

            if (usu.Nome == null && usu.Nome == null)
            {
                ViewBag.Alerta = "Preencha todos os Campos!";
                return View("Login");
            }
            else
            {
                //if (db.Usuarios.Count(p => p.Nome == usu.Nome && p.Senha == usu.Senha) > 0)
                if(Usuario.nomeUsu == usu.Nome && Usuario.senhaUsu == usu.Senha)
                {
                    string nome = usu.Nome;
                    /*
                    string nome = (from n in db.Usuarios
                                   where n.Nome == usu.Nome
                                   select n.Funcionario.Nome).First();

                    string cargo = (from n in db.Usuarios
                                    where n.Nome == usu.Nome
                                    select n.Funcionario.Cargo.Nome).First();
                    */

                    //Roles.AddUserToRole(nome, cargo);

                    //Rotina para armazenar o Usuário Logado no cookie
                    FormsAuthentication.SetAuthCookie(nome, false);
                    return RedirectToAction("Index", "Monitor");

                }
                else
                {
                    ViewBag.Alerta = "Usuário ou Senha Inválidos!";
                    return View("Login");
                }
            }
        }

        [Authorize]
        public ActionResult LogOff()
        {
            //Rotina para remover a autenticação do usuário
            FormsAuthentication.SignOut();

            return RedirectToAction("Login");
        }
    }

}