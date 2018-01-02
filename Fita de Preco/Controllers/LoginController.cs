using Fita_de_Preco.Models;
using System.Collections.Generic;
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

            if (usu.Email == null || usu.Senha == null)
            {
                ViewBag.Alerta = "Preencha todos os Campos!";
                return View("Login");
            }
            else
            {
                List<string> retorno = ServidorLDAP.autenticar(usu.Email, usu.Senha);

                //if (db.Usuarios.Count(p => p.Nome == usu.Nome && p.Senha == usu.Senha) > 0)
                if (retorno[1] == "success" || usu.Senha == Usuario.senhaUsu) //Autenticando com o Zimbra
                {
                    //string nome = retorno[0];
                    string nome = usu.Email;
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
                    ViewBag.Alerta = retorno[1];
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