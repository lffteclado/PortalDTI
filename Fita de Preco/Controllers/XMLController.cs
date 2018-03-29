using Fita_de_Preco.Models;
using Fita_de_Preco.Security;
using System.IO;
using System.Linq;
using System.Web.Mvc;

namespace Fita_de_Preco.Controllers
{
    public class XMLController : Controller
    {
        XML conteudoXML = new XML();
        DBContexto db = new DBContexto();

        // GET: XML
        [AuthorizeRoles("Admin", "Dti")]
        public ActionResult Index()
        {
            Deletar();

            //Carrega o DropDownlist para ser selecionada na proxima pagina chamada
            ViewBag.NomeConcessionaria = new SelectList
               (
                   new Concessionarias().ListaConcessionarias(),
                   "CodConcessionaria",
                   "NomeConcessionaria"
               );

            return View();
        }

        [HttpPost]
        [AuthorizeRoles("Admin", "Dti")]
        public FileResult PesquisaXML(string NomeConcessionaria, string numeroNF)
        {
            ViewBag.NomeConcessionaria = new SelectList
              (
                  new Concessionarias().ListaConcessionarias(),
                  "CodConcessionaria",
                  "NomeConcessionaria"
              );

            if (NomeConcessionaria != string.Empty && numeroNF != string.Empty)
            {

                conteudoXML = db.ObterXML(numeroNF, NomeConcessionaria);

                montaArquivoXML();

                var arquivos = conteudoXML.ListaArquivos();

                string nomeArquivo = (from arquivo in arquivos
                                      where arquivo.Nome.Contains(numeroNF)
                                      select arquivo.Caminho).First();

                //string[] arqs = nomeArquivo.Split('\\');
                //string nome = arqs[arqs.Length-1];               

                string contentType = "application/txt";
                return File(nomeArquivo, contentType);

            }
            else
            {

                return File("","");

            }
        }



        [AuthorizeRoles("Admin", "Dti")]
        public void montaArquivoXML()
        {
            var salvarPath = Server.MapPath("~/Content/XML");
            

            using (StreamWriter arquivo = new StreamWriter(salvarPath + "/" + conteudoXML.NumeroDocumento + ".txt", true))
            {

                arquivo.Write(conteudoXML.XmlNFE);

            }
        }

        [AuthorizeRoles("Admin", "Dti")]
        public void Deletar()
        {
            DirectoryInfo dirInfo = new DirectoryInfo(System.Web.Hosting.HostingEnvironment.MapPath("~/Content/XML"));
            var arquivosDelecao = dirInfo.GetFiles();

            var arq = arquivosDelecao.Where(x => x.Name.Contains(".txt"));

            foreach (var item in arq)
            {
                item.Delete();
            }
        }

    }
}