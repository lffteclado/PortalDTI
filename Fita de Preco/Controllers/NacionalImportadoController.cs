using System;
using System.Web.Mvc;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using System.Net;

namespace Fita_de_Preco.Controllers
{
    public class NacionalImportadoController : Controller
    {
        IEnumerable<string> arquivo;//Cria Objeto para Armazenar o Arquivo Lido
        string nomeArquivo = string.Empty;//Armazena o nome do Arquivo Lido
        //bool status = false;//Verifica se exite arquivo para ser lido caso exista o Status muda para True
        //List<string> nacional = new List<string>();
        //List<string> importado = new List<string>();
        List<string> itemImportado = new List<string>();
        List<string> itemNacional = new List<string>();

        // GET: NacionalImportado
        [Authorize]
        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public ActionResult Upload()
        {
            int i = 0;

            for ( i = 0; i < Request.Files.Count; i++)
            {
                var file = Request.Files[i];

                var fileName = Path.GetFileName(file.FileName);

                var path = Path.Combine(Server.MapPath("~/Content/Uploads"), fileName);
                file.SaveAs(path);
            }

            return Json(new {result = i + "Arquivo(s) Salvos(s) com sucesso!" });
        }

        #region UPloadAntigo
        //public ActionResult FileNacImp(UploadFileResult arq)
        //{
        //    try
        //    {
        //        string nomeArquivo = string.Empty;
        //        string arquivosEnviados = string.Empty;
        //        foreach (var arquivo in arq.Arquivos)
        //        {
        //            if (arquivo.ContentLength > 0)
        //            {
        //                nomeArquivo = Path.GetFileName(arquivo.FileName);
        //                var caminho = Path.Combine(Server.MapPath("~/Content/Uploads"), nomeArquivo);
        //                arquivo.SaveAs(caminho);
        //            }

        //            arquivosEnviados = arquivosEnviados + ", " + nomeArquivo; 
        //        }


        //        ViewData["Message"] = "Arquivo(s): "+ arquivosEnviados + " enviado(s) com sucesso!";
        //        ViewData["status"] = "ok";
        //    }
        //    catch (Exception ex)
        //    {
        //        ViewData["MessageErro"] = "Erro: " + ex.Message;
        //    }

        //    return RedirectToAction("Index", "Home");
        //}

        #endregion

        [Authorize]
            public ActionResult ArquivoNacImp()
        {


            //Armazena as informaçõe do Diretorio, caminho, arquivos e todas as informações do Diretorio
            DirectoryInfo dirInfo = new DirectoryInfo(System.Web.Hosting.HostingEnvironment.MapPath("~/Content/Uploads"));

            //Carrega os arquivo da Pasta Uploads em uma lista
            var listaArquivos = dirInfo.GetFiles();

            //Pesquiso na lista o arquivo com o mesmo código da Empresa Selecionada
            var nome = listaArquivos.Where(x => x.Name.Contains("_prdad"));

            //Mapeado o Diretorio Upload para usá-lo na hora de ler o arquivo encontrado
            var uploadPath = Server.MapPath("~/Content/Uploads");

            //Mapeado o Diretorio Corrigido para usá-lo na hora de salvar o arquivo gerado
            var uploadPath2 = Server.MapPath("~/Content/Corrigido");

            //Objeto para Abrir e Fechar o Arquivo.
            StreamReader sr;

            //For para correr a lista de arquivos carregados
            foreach (var arq in nome)
            {
                nomeArquivo = arq.Name;
                sr = System.IO.File.OpenText(uploadPath + "/" + nomeArquivo);

                arquivo = System.IO.File.ReadAllLines(uploadPath + "/" + nomeArquivo);

                foreach (string line in arquivo)
                {

                    if (line.Contains("3G"))
                    {
                        int ini = line.IndexOf("3G");

                        string item = line.Substring(0, ini);

                        item = item.Trim();

                        item = item.Replace(" ", "");

                        itemImportado.Add(item);

                    }
                    else if (line.Contains("3N") || (line.Contains("3F")))
                    {

                        int ini = 0;

                        if (line.Contains("3N"))
                        {
                            ini = line.IndexOf("3N");

                        }
                        else if (line.Contains("3F"))
                        {
                            ini = line.IndexOf("3F");
                        }

                        string item = line.Substring(0, ini);

                        item = item.Trim();

                        item = item.Replace(" ", "");

                        itemNacional.Add(item);
                    }
                }

                sr.Close();

                #region MetodoCorreçãoAntigo
                /* Criação do Script para Atualizar os Itens Nacionais
                using (StreamWriter file = new StreamWriter(uploadPath2 + "/" + nomeArquivo + ".sql", true))
                {

                    file.WriteLine("--Arquivo de Correção dos itens Nacionais das Concessionárias!");
                    file.WriteLine("--Quantidade de itens: " + itemNacional.Count);
                    file.WriteLine("select 	CodigoProduto,");
                    file.WriteLine("ProdutoImportadoDireto,");
                    file.WriteLine("ProdutoImportado,");
                    file.WriteLine("CodigoTributacaoProduto,");
                    file.WriteLine("NacionalMaior40Import,");
                    file.WriteLine("NacionalAte40Import");
                    file.WriteLine("into #tmpI");
                    file.WriteLine("from tbProdutoFT where (REPLACE(CodigoProduto,' ','') ='" + itemNacional[0] + "'");

                    for (int i = 1; i < itemNacional.Count; i++)
                    {
                        if (i == itemNacional.Count - 1)
                        {
                            file.WriteLine("or REPLACE(CodigoProduto,' ','') ='" + itemNacional[i] + "')");
                        }
                        else
                        {
                            file.WriteLine("or REPLACE(CodigoProduto,' ','') ='" + itemNacional[i] + "'");
                        }

                    }

                    file.WriteLine("AND ( ProdutoImportadoDireto <> 'F'");
                    file.WriteLine("OR ProdutoImportado <> 'F'");
                    file.WriteLine("OR CodigoTributacaoProduto <> 'F'");
                    file.WriteLine("OR NacionalMaior40Import <> 'F'");
                    file.WriteLine("OR NacionalAte40Import <> 'F')");

                    file.WriteLine("select count(*) from #tmpI");

                    file.WriteLine("update tbProdutoFT set ProdutoImportadoDireto = 'F',");
                    file.WriteLine("ProdutoImportado = 'F',");
                    file.WriteLine("CodigoTributacaoProduto = 'F',");
                    file.WriteLine("NacionalMaior40Import = 'F',");
                    file.WriteLine("NacionalAte40Import = 'F'");
                    file.WriteLine("where CodigoProduto in (select tbPFT.CodigoProduto");
                    file.WriteLine("from tbProdutoFT tbPFT");
                    file.WriteLine("inner join #tmpI I on");
                    file.WriteLine("I.CodigoProduto = tbPFT.CodigoProduto and");
                    file.WriteLine("I.ProdutoImportadoDireto = tbPFT.ProdutoImportadoDireto and");
                    file.WriteLine("I.ProdutoImportado = tbPFT.ProdutoImportado and");
                    file.WriteLine("I.CodigoTributacaoProduto = tbPFT.CodigoTributacaoProduto and");
                    file.WriteLine("I.NacionalMaior40Import = tbPFT.NacionalMaior40Import and");
                    file.WriteLine("I.NacionalAte40Import = tbPFT.NacionalAte40Import)");
                    file.WriteLine("drop table #tmpI");
                }

                itemNacional.Clear();//Limpando a Lista para o Proximo arquivo
                */
                #endregion

            }//Fim do Foreach para ler arquivos e carregar as listas de Nacional e Importado

            /***************************************************************************************************/

            /* Script para alimentar a Tabela  tempProdutoImportados com os itens Importados*/
            using (StreamWriter file = new StreamWriter(uploadPath2 + "/ProdutoImportado.sql", true))
            {

                file.WriteLine("--Script para Alimentar a Tabela [dbVDL].dbo.tempProdutoImportados com os itens Importados!");
                file.WriteLine("----Quantidade de itens: " + itemImportado.Count);
                file.WriteLine("declare @Prod VARCHAR(30)");
                file.WriteLine("declare @Tipo VARCHAR(10)");

                for (int i = 0; i < itemImportado.Count; i++)
                {
                    file.WriteLine("set @Prod ='" + itemImportado[i] + "' set @Tipo ='G'");
                    file.WriteLine("insert into [dbVDL].dbo.tempProdutoImportados(Codigo,Tipo) values (@Prod, @Tipo)");

                }

            }

            /* Script para alimentar a Tabela  tempProdutoImportados com os itens Nacionais*/
            using (StreamWriter file = new StreamWriter(uploadPath2 + "/ProdutoNacional.sql", true))
            {

                file.WriteLine("--Script para Alimentar a Tabela tempProdutoImportados com os itens Nacionais!");
                file.WriteLine("----Quantidade de itens: " + itemNacional.Count);
                file.WriteLine("declare @Prod VARCHAR(30)");
                file.WriteLine("declare @Tipo VARCHAR(10)");

                for (int i = 0; i < itemNacional.Count; i++)
                {
                    file.WriteLine("set @Prod ='" + itemNacional[i] + "' set @Tipo ='F'");
                    file.WriteLine("insert into [dbVDL].dbo.tempProdutoImportados(Codigo,Tipo) values (@Prod, @Tipo)");

                }

            }

            #region MetodoCorreçãoAntigo2
            /* Criação do Script para Atualizar os Itens Importados */
            /*
            using (StreamWriter file = new StreamWriter(uploadPath2 + "/Importado.sql", true))
            {

                file.WriteLine("--Arquivo de Correção dos itens Importados das Concessionárias!");
                file.WriteLine("----Quantidade de itens: " + itemImportado.Count);
                file.WriteLine("select 	CodigoProduto,");
                file.WriteLine("ProdutoImportadoDireto,");
                file.WriteLine("ProdutoImportado,");
                file.WriteLine("CodigoTributacaoProduto,");
                file.WriteLine("NacionalMaior40Import,");
                file.WriteLine("NacionalAte40Import");
                file.WriteLine("into #tmpI");
                file.WriteLine("from tbProdutoFT where (REPLACE(CodigoProduto,' ','') ='" + itemImportado[0] + "'");

                for (int i = 1; i < itemImportado.Count; i++)
                {
                    if (i == itemImportado.Count - 1)
                    {
                        file.WriteLine("or REPLACE(CodigoProduto,' ','') ='" + itemImportado[i] + "')");
                    }
                    else
                    {
                        file.WriteLine("or REPLACE(CodigoProduto,' ','') ='" + itemImportado[i] + "'");
                    }


                }

                file.WriteLine("AND ( ProdutoImportadoDireto <> 'V'");
                file.WriteLine("AND ProdutoImportado <> 'V')");
                file.WriteLine("select count(*) from #tmpI");

                file.WriteLine("update tbProdutoFT set ProdutoImportadoDireto = 'F',");
                file.WriteLine("ProdutoImportado = 'V',");
                file.WriteLine("CodigoTributacaoProduto = 'F',");
                file.WriteLine("NacionalMaior40Import = 'F',");
                file.WriteLine("NacionalAte40Import = 'F'");
                file.WriteLine("where CodigoProduto in (select  tbPFT.CodigoProduto");
                file.WriteLine("from tbProdutoFT tbPFT");
                file.WriteLine("inner join #tmpI I on");
                file.WriteLine("I.CodigoProduto = tbPFT.CodigoProduto and");
                file.WriteLine("I.ProdutoImportadoDireto = tbPFT.ProdutoImportadoDireto and");
                file.WriteLine("I.ProdutoImportado = tbPFT.ProdutoImportado and");
                file.WriteLine("I.CodigoTributacaoProduto = tbPFT.CodigoTributacaoProduto and");
                file.WriteLine("I.NacionalMaior40Import = tbPFT.NacionalMaior40Import and");
                file.WriteLine("I.NacionalAte40Import = tbPFT.NacionalAte40Import)");
                file.WriteLine("drop table #tmpI");
            }
            */

            /* Criação do Script para Atualizar os Itens Auxiliares Importados
            using (StreamWriter file = new StreamWriter(uploadPath2 + "/AuxiliarImportado.sql", true))
            {

                file.WriteLine("--Arquivo de Correção dos itens Auxilizares Importados das Concessionárias!");
                file.WriteLine("----Quantidade de itens: " + itemImportado.Count);
                file.WriteLine("select CodigoProdutoAuxiliar,");
                file.WriteLine("Importado");
                file.WriteLine("into #tmpI");
                file.WriteLine("from tbProdutoAuxiliar where (REPLACE(CodigoProdutoAuxiliar,' ','') ='" + itemImportado[0] + "'");

                for (int i = 1; i < itemImportado.Count; i++)
                {
                    if (i == itemImportado.Count - 1)
                    {
                        file.WriteLine("or REPLACE(CodigoProdutoAuxiliar,' ','') ='" + itemImportado[i] + "')");
                    }
                    else
                    {
                        file.WriteLine("or REPLACE(CodigoProdutoAuxiliar,' ','') ='" + itemImportado[i] + "'");
                    }


                }

                file.WriteLine("select count(*) as Total_de_Itens from #tmpI");

                file.WriteLine("update tbProdutoAuxiliar set Importado = 'V'");
                file.WriteLine("where CodigoProdutoAuxiliar in (select  tbPA.CodigoProdutoAuxiliar");
                file.WriteLine("from tbProdutoAuxiliar tbPA");
                file.WriteLine("inner join #tmpI I on");
                file.WriteLine("I.CodigoProdutoAuxiliar = tbPA.CodigoProdutoAuxiliar)");

                file.WriteLine("drop table #tmpI");
            }*/

            #endregion

            //limpa a pasta Uploads
            if (listaArquivos.Length > 0)
            {
                foreach (var item in listaArquivos)
                {
                    item.Delete();
                }

            }

            return RedirectToAction("Index", "Download");
        }
    }
}
