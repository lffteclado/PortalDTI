using Fita_de_Preco.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Fita_de_Preco.Controllers
{

    public class HomeController : Controller
    {
        IEnumerable<string> arquivo;//Cria Objeto para Armazenar o Arquivo Lido
        string nomeArquivo = string.Empty;//Armazena o nome do Arquivo Lido
        bool status = false;//Verifica se exite arquivo para ser lido caso exista o Status muda para True

        //List<Concessionarias> ListaConcessionarias = new List<Concessionarias>();
        //Concessionarias con = new Concessionarias();

        //Action inicial que chama a Pagina Index
        [Authorize]
        public ActionResult Index()
        {
            return View();
        }

        //Action que é chamada para salvar o arquivo CSV
        [HttpPost]
        [Authorize]
        public ActionResult FileUpLoad(FormCollection f)
        {
            //Carrega o DropDownlist para ser selecionada na proxima pagina chamada
            ViewBag.CodConcessionaria = new SelectList
               (
                   new Concessionarias().ListaConcessionarias(),
                   "CodConcessionaria",
                   "NomeConcessionaria"
               );

            int arquivosSalvos = 0;//Contador para informar quantos arquivos foram salvos

            if(Request != null)
            {
                //Pega o arquivo enviado pelo formulario de upload
                HttpPostedFileBase arquivo = Request.Files["arquivoUpload"];
                
                //Salva o arquivo
                if (arquivo.ContentLength > 0)
                {
                    var uploadPath = Server.MapPath("~/Content/Uploads");
                    string caminhoArquivo = Path.Combine(@uploadPath, Path.GetFileName(arquivo.FileName));
                    nomeArquivo = arquivo.FileName;
                    arquivo.SaveAs(caminhoArquivo);
                    arquivosSalvos++;
                }
            }

            ViewData["Message"] = String.Format("{0} Arquivo(s) Salvos(s) com sucesso.",
                arquivosSalvos);

            return View("Arquivo");//Envia para a View Arquivo
        }

        [HttpPost]
        [Authorize]
        public ActionResult Arquivo(string CodConcessionaria)
        {
            ViewBag.CodConcessionaria = new SelectList
               (
                   new Concessionarias().ListaConcessionarias(),
                   "CodConcessionaria",
                   "NomeConcessionaria"
               );

            //Armazena as informaçõe do Diretorio, caminho, arquivos e todas as informações do Diretorio
            DirectoryInfo dirInfo = new DirectoryInfo(System.Web.Hosting.HostingEnvironment.MapPath("~/Content/Uploads"));

            //Carrega os arquivo da Pasta Uploads em uma lista
            var listaArquivos = dirInfo.GetFiles();

            //Pesquiso na lista o arquivo com o mesmo código da Empresa Selecionada
            var nome = listaArquivos.Where(x => x.Name.Contains(CodConcessionaria));

            //Mapeado o Diretorio Upload para usá-lo na hora de ler o arquivo encontrado
            var uploadPath = Server.MapPath("~/Content/Uploads");

            //Objeto para Abrir e Fechar o Arquivo.
            StreamReader sr;

            //For para correr a lista de arquivo e encontrar o arquivo correposndente a Casa Escolhida
            foreach (var arq in nome)
            {

                status = true;

                nomeArquivo = arq.Name;
                sr = System.IO.File.OpenText(uploadPath + "/" + nomeArquivo);

                arquivo = System.IO.File.ReadAllLines(uploadPath + "/" + nomeArquivo);

                sr.Close();                
            }

            if (status)//Verificando se existe arquivo e se ele foi carregado
            {

                DateTime dt = new DateTime();

                dt = DateTime.Now;

                string data = String.Format("{0:yyyy-MM-dd}", dt);

                string Nome = string.Empty;

                switch (CodConcessionaria)
                {
                    case "1200":
                        Nome = "Auto_Sete";
                        break;

                    case "262":
                        Nome = "Calisto";
                        break;

                    case "930":
                        Nome = "Cardiesel";
                        break;

                    case "2630":
                        Nome = "Goias";
                        break;

                    case "3140":
                        Nome = "Montes_Claros";
                        break;

                    case "2890":
                        Nome = "Posto_Imperial";
                        break;

                    case "130":
                        Nome = "Vadiesel";
                        break;

                    case "2620":
                        Nome = "Uberlandia";
                        break;

                    case "260":
                        Nome = "Valadares";
                        break;

                    case "3610":
                        Nome = "Rede_Mineira";
                        break;
                }

                uploadPath = Server.MapPath("~/Content/Corrigido");

                using (StreamWriter file = new StreamWriter(uploadPath + "/" + Nome + ".sql", true))
                {

                    file.WriteLine("--Arquivo de Correção dos itens da Concessionária: "+Nome);
                    file.WriteLine("declare @Prod varchar(50)");
                    file.WriteLine("declare @Preco money");

                    foreach (string line in arquivo)
                    {
                        string[] item = line.Split(';');
                        string valor = item[1].Replace(',', '.');

                        file.WriteLine("set @Prod ='" + item[0] + "' set @Preco ='" + valor + "'");
                        file.WriteLine("if exists(select * from tbProduto where CodigoProduto = @Prod)");
                        file.WriteLine("begin");
                        file.WriteLine("insert into tbTabelaPreco (CodigoEmpresa,CodigoTipoTabelaPreco,CodigoProduto,DataValidadeTabelaPreco,ValorTabelaPreco,ReajusteEfetuado) values (" + CodConcessionaria + ",1,@Prod,'" + data + "',@Preco,'V')");
                        file.WriteLine("insert into tempItemForaTabela(CodPro,CodPreco,CodAlt) values (@Prod,@Preco,'A')");
                        file.WriteLine("end");
                        file.WriteLine("else");
                        file.WriteLine("if not exists(select * from tbProduto where CodigoProduto = @Prod )");
                        file.WriteLine("begin");
                        file.WriteLine("insert into tempItemForaTabela(CodPro,CodPreco) values (@Prod,@Preco)");
                        file.WriteLine("end");
                    }
                }    

                if (listaArquivos.Length > 0)
                {
                    listaArquivos[0].Delete();
                }

                return RedirectToAction("Index", "Download");
            }
            else
            {
                ViewData["MessageErro"] = "Selecione a Concessionaria de Acordo com o Arquivo!";
                return View("Arquivo");
            }
        }

    }
}