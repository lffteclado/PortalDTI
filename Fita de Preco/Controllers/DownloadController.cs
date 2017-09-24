using Fita_de_Preco.Models;
using System;
using System.IO;
using System.Linq;
using System.Web.Mvc;

namespace Fita_de_Preco.Controllers
{
    public class DownloadController : Controller
    {
        UploadFileResult oModelArquivos = new UploadFileResult();

        // GET: Download
        [Authorize]
        public ActionResult Index()
        {
            var _arquivos = oModelArquivos.ListaArquivos();
            return View(_arquivos);
        }

        [Authorize]
        public FileResult Download(string id, string nome)
        {
            int _arquivoId = Convert.ToInt32(id);
            var arquivos = oModelArquivos.ListaArquivos();

            string nomeArquivo = (from arquivo in arquivos
                                  where arquivo.IDArquivo == _arquivoId
                                  select arquivo.Caminho).First();

            //string[] arqs = nomeArquivo.Split('\\');
            //string nome = arqs[arqs.Length-1];               
            
            string contentType = "application/sql";
            return File(nomeArquivo, contentType, nome);
        }

        [Authorize]
        public ActionResult Deletar(string nome)
        {
            DirectoryInfo dirInfo = new DirectoryInfo(System.Web.Hosting.HostingEnvironment.MapPath("~/Content/Corrigido"));
            var arquivosDelecao = dirInfo.GetFiles();

            var arq = arquivosDelecao.Where(x => x.Name == nome);

            foreach (var item in arq)
            {
                item.Delete();
            }

            return RedirectToAction("Index", "Download");
        }
    }
}