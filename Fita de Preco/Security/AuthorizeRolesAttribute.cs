﻿using Fita_de_Preco.Models;
using Fita_de_Preco.Models.DataModel;
using System.Web;
using System.Web.Mvc;

namespace Fita_de_Preco.Security
{
    public class AuthorizeRolesAttribute:AuthorizeAttribute
    {
        private readonly string[] userAssignedRoles;
        public AuthorizeRolesAttribute(params string[] roles)
        {
            this.userAssignedRoles = roles;
        }
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            bool authorize = false;
            using (dbVDLEntities db = new dbVDLEntities())
            {
                UserManager UM = new UserManager();
                foreach (var roles in userAssignedRoles)
                {
                    authorize = UM.IsUserInRole(httpContext.User.Identity.Name, roles);
                    if (authorize)
                        return authorize;
                }
            }

            return authorize;
            
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            filterContext.Result = new RedirectResult("~/Erro/Index");

        }


    }
}