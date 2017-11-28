using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.DirectoryServices.Protocols;
using System.DirectoryServices;
using System.Security.Permissions;

namespace Fita_de_Preco.Models
{
    [DirectoryServicesPermission(SecurityAction.LinkDemand, Unrestricted = true)]
    public class ServidorLDAP
    {
        private static string _nome = "Zimbra";
        private static string _ip = "192.168.100.5";
        private static int _porta = 389;
        private static string _user = "uid=zimbra,cn=admins,cn=zimbra";
        private static string _senha = "DrpmsNtqWu";
        private static string _mensagem;

        public string Nome
        {
            get { return _nome; }
            //set { _nome = value; }            
        }

        public string IP
        {
            get { return _ip; }
            //set { _ip = value; } 
        }

        public int Porta
        {
            get { return _porta; }
            //set { _porta = value; } 
        }

        public string User
        {
            get { return _user; }
            //set { _user = value; } 
        }

        public string Senha
        {
            get { return _senha; }
            //set { _senha = value; } 
        }

        public string Msg
        {
            get{ return _mensagem; }
            //set { _mensagem = value; } 
        }

        public static void autenticar(string email, string senha)
        {
            string[] emailBroke = email.Split('@');

            string[] dominioBroke = emailBroke[1].Split('.');

            string login = @"uid=" + emailBroke[0] + ",ou=people,dc=" + dominioBroke[0] + ",dc=" + dominioBroke[1] + ",dc=" + dominioBroke[2];

            try
            {
                // Create the new LDAP connection
                LdapDirectoryIdentifier ldi = new LdapDirectoryIdentifier(_ip, _porta);
                LdapConnection ldapConnection = new LdapConnection(ldi);
                //Console.WriteLine("LdapConnection is created successfully.");
                ldapConnection.AuthType = AuthType.Basic;
                ldapConnection.SessionOptions.ProtocolVersion = 3;
                NetworkCredential nc = new NetworkCredential(login, senha);
                //NetworkCredential nc = new NetworkCredential("uid=luisfelipe,ou=people,dc=grupovdl,dc=com,dc=br", ""); //password
                ldapConnection.Bind(nc);
                _mensagem = "LdapConnection authentication success";

                ldapConnection.Dispose();
            }
            catch (LdapException e)
            {
                _mensagem = ("\r\nUnable to login:\r\n\t" + e.Message);
            }
            catch (Exception e)
            {
                _mensagem = ("\r\nUnexpected exception occured:\r\n\t" + e.GetType() + ":" + e.Message);
            }

        }
    }
}