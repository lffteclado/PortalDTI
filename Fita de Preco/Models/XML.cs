using System.Collections.Generic;
using System.IO;

namespace Fita_de_Preco.Models
{
    public class XML
    {
        public string XmlNFE { get; set; } // conteudo XML

        public string NumeroDocumento { get; set; } // numero da NF


        public List<UploadFileResult> ListaArquivos()
        {
            List<UploadFileResult> lstArquivos = new List<UploadFileResult>();
            DirectoryInfo dirInfo = new DirectoryInfo(System.Web.Hosting.HostingEnvironment.MapPath("~/Content/XML"));

            int i = 0;

            foreach (var item in dirInfo.GetFiles())
            {
                lstArquivos.Add(new UploadFileResult()
                {
                    IDArquivo = i + 1,
                    Nome = item.Name,
                    Caminho = dirInfo.FullName + @"\" + item.Name

                });

                i = i + 1;
            }

            return lstArquivos;
        }
    }
}