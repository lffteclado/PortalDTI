using System;
using System.Collections.Generic;
using System.Linq;
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

        public static List<string> autenticar(string email, string senha)
        {
            List<string> retorno = new List<string>();

            if (email.Contains('@'))
            {
                string[] emailBroke = email.Split('@');

                if(emailBroke.Length == 2)
                {
                    string[] dominioBroke = emailBroke[1].Split('.');                    

                    retorno.Add(emailBroke[0]);

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
                        _mensagem = "success";
                        retorno.Add(_mensagem);
                        ldapConnection.Dispose();
                    }
                    catch (LdapException e)
                    {
                        _mensagem = e.Message;
                        retorno.Add(_mensagem);
                    }
                    catch (Exception e)
                    {
                        _mensagem = ("\r\nUnexpected exception occured:\r\n\t" + e.GetType() + ":" + e.Message);
                        retorno.Add(_mensagem);
                    }

                    return retorno;
                }
                else
                {
                    retorno.Add(email);
                    _mensagem = "Informe um Email Válido!";
                    retorno.Add(_mensagem);

                    return retorno;
                }
            }
            else
            {
                retorno.Add(email);
                _mensagem = "Informe um Email Válido!";
                retorno.Add(_mensagem);

                return retorno;
            }
        }
    }
}