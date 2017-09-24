using System.Collections.Generic;
using System.IO;
using System.Web;

namespace Fita_de_Preco.Models
{
    public class UploadFileResult
    {
        public IEnumerable<HttpPostedFileBase> Arquivos { get; set; }

        public int IDArquivo { get; set; }

        public string Nome { get; set; }

        public int Tamanho { get; set; }

        public string Tipo { get; set; }

        public string Caminho { get; set; }

        public List<UploadFileResult> ListaArquivos()
        {
            List<UploadFileResult> lstArquivos = new List<UploadFileResult>();
            DirectoryInfo dirInfo = new DirectoryInfo(System.Web.Hosting.HostingEnvironment.MapPath("~/Content/Corrigido"));

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