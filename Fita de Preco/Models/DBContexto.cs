using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Configuration;
using System.Xml;

namespace Fita_de_Preco.Models
{
    public class DBContexto
    {
        List<StatusPlanos> lstPlanos = new List<StatusPlanos>();

        public void ObterPlanoDB60()
        {
            ConnectionStringSettings getString = WebConfigurationManager.ConnectionStrings["DB60"] as ConnectionStringSettings;

            if (getString != null)
            {
                string sSQL = "select * from vwCheckVDL";

                using (SqlConnection con = new SqlConnection(getString.ConnectionString))
                {
                    //List<StatusPlanos> lstPlanos = new List<StatusPlanos>();

                    SqlDataReader r = null;
                    SqlCommand cmd = new SqlCommand(sSQL, con);

                    con.Open();

                    r = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                    while (r.Read())
                    {
                        StatusPlanos plano = new StatusPlanos();

                        plano.CodEmpresa = r["CodEmpresa"].ToString();
                        plano.NomeEmpresa = r["NomeEmpresa"].ToString();
                        plano.Local = r["Local"].ToString();
                        plano.PlanoBloqueio = r["PlanoBloqueio"].ToString();
                        plano.VendaAbaixoCusto = r["VendaAbaixoCusto"].ToString();
                        plano.DescontoMinimo = r["DescontoMinimo"].ToString();
                        plano.ValorDescMinimo = string.Format("{0:C}", r["ValorDescMinimo"]);

                        lstPlanos.Add(plano);

                    }
                }
            }
        }

        public void ObterPlanoServer242()
        {
            ConnectionStringSettings getString = WebConfigurationManager.ConnectionStrings["ConnDB"] as ConnectionStringSettings;

            if (getString != null)
            {
                string sSQL = "select * from vwCheckVDL";

                using (SqlConnection con = new SqlConnection(getString.ConnectionString))
                {
                    //List<StatusPlanos> lstPlanos = new List<StatusPlanos>();

                    SqlDataReader r = null;
                    SqlCommand cmd = new SqlCommand(sSQL, con);

                    con.Open();

                    r = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                    while (r.Read())
                    {
                        StatusPlanos plano = new StatusPlanos();

                        plano.CodEmpresa = r["CodEmpresa"].ToString();
                        plano.NomeEmpresa = r["NomeEmpresa"].ToString();
                        plano.Local = r["Local"].ToString();
                        plano.PlanoBloqueio = r["PlanoBloqueio"].ToString();
                        plano.VendaAbaixoCusto = r["VendaAbaixoCusto"].ToString();
                        plano.DescontoMinimo = r["DescontoMinimo"].ToString();
                        plano.ValorDescMinimo = string.Format("{0:C}", r["ValorDescMinimo"]);

                        lstPlanos.Add(plano);

                    }
                }
            }
        }

        public List<StatusPlanos> ObterPlanos()
        {
            //Obtendo os Planos das Casas do Server 242
            ObterPlanoServer242();

            //Obtendo os Planos das Casas do Server 0.60
            ObterPlanoDB60();

            ConnectionStringSettings getString = WebConfigurationManager.ConnectionStrings["DBMOC"] as ConnectionStringSettings;

            if (getString != null)
            {
                string sSQL = "select * from vwCheckVDL";

                using (SqlConnection con = new SqlConnection(getString.ConnectionString))
                {

                    SqlDataReader r = null;
                    SqlCommand cmd = new SqlCommand(sSQL, con);

                    con.Open();

                    r = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                    while (r.Read())
                    {
                        StatusPlanos plano = new StatusPlanos();

                        plano.CodEmpresa = r["CodEmpresa"].ToString();
                        plano.NomeEmpresa = r["NomeEmpresa"].ToString();
                        plano.Local = r["Local"].ToString();
                        plano.PlanoBloqueio = r["PlanoBloqueio"].ToString();
                        plano.VendaAbaixoCusto = r["VendaAbaixoCusto"].ToString();
                        plano.DescontoMinimo = r["DescontoMinimo"].ToString();
                        plano.ValorDescMinimo = string.Format("{0:C}", r["ValorDescMinimo"]);

                        lstPlanos.Add(plano);

                    }

                    return lstPlanos;
                }
            }

            return null;
        }

        public XML ObterXML(string nota, string casa)
        {
            ConnectionStringSettings getString = WebConfigurationManager.ConnectionStrings["ConnDB"] as ConnectionStringSettings;

            XML conteudoXML = new XML();
            string banco = string.Empty;
            switch (casa)
            {
                case "1200":
                    banco = "dbAutosete";
                    break;

                case "262":
                    banco = "dbCalisto";
                    break;

                case "930":
                    banco = "dbCardiesel_I";
                    break;

                case "2630":
                    banco = "dbGoias";
                    break;

                case "2890":
                    banco = "dbPostoImperialDP";
                    break;

                case "2620":
                    banco = "dbUberlandia";
                    break;

                case "3610":
                    banco = "dbRedeMineira";
                    break;

                case "130":
                    banco = "dbVadiesel";
                    break;

                case "260":
                    banco = "dbValadaresCNV";
                    break;

                case "3140":

                    getString = WebConfigurationManager.ConnectionStrings["DBMOC"] as ConnectionStringSettings;

                    banco = "dbMontesClaros";

                    break;
            

                default:
                    break;
            }

            if (getString != null)
            {
                //string sSQL = "select XmlNFE from tbDMSTransitoNFe where NumeroDocumento like '%"+nota+"%' for xml path";

                string sSQL = "select XmlNFE, NumeroDocumento from "+banco+".dbo.tbDMSTransitoNFe where NumeroDocumento = '"+nota+"'";

                using (SqlConnection con = new SqlConnection(getString.ConnectionString))
                {

                    SqlDataReader r = null;

                    //XmlReader x = null;

                    SqlCommand cmd = new SqlCommand(sSQL, con);

                    con.Open();

                    r = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                    while (r.Read())
                    {
                        conteudoXML.XmlNFE = r["XmlNFE"].ToString();
                        conteudoXML.NumeroDocumento = r["NumeroDocumento"].ToString();
                    }

                    return conteudoXML;
                }

            }
            return null;
        }

        public void BloquearPlanos(Planos plano)
        {
            if (plano.CodigoEmpresa == 3140 || plano.CodigoEmpresa == 3610)
            {            

                ConnectionStringSettings getString = WebConfigurationManager.ConnectionStrings["DBMOC"] as ConnectionStringSettings;

                if (getString != null)
                {
                    using (SqlConnection con = new SqlConnection(getString.ConnectionString))
                    {
                        try
                        {
                            SqlCommand cmd = new SqlCommand("sp_BloqueiaPlano", con);
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@CodigoEmpresa", plano.CodigoEmpresa);
                            cmd.Parameters.AddWithValue("@CodigoPlano", plano.CodigoPlano);
                            cmd.Parameters.AddWithValue("@PlanoBloqueado", plano.PlanoBloqueado);

                            con.Open();

                            cmd.ExecuteNonQuery();
                        }
                        catch (Exception e)
                        {
                            string msg = e.Message;
                        }
                        finally
                        {
                            con.Close();
                        }
                    }
                }

            }else if (plano.CodigoEmpresa == 260)
            {
                ConnectionStringSettings getString = WebConfigurationManager.ConnectionStrings["DB60"] as ConnectionStringSettings;

                if (getString != null)
                {
                    using (SqlConnection con = new SqlConnection(getString.ConnectionString))
                    {
                        try
                        {
                            SqlCommand cmd = new SqlCommand("sp_BloqueiaPlano", con);
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@CodigoEmpresa", plano.CodigoEmpresa);
                            cmd.Parameters.AddWithValue("@CodigoPlano", plano.CodigoPlano);
                            cmd.Parameters.AddWithValue("@PlanoBloqueado", plano.PlanoBloqueado);

                            con.Open();

                            cmd.ExecuteNonQuery();
                        }
                        catch (Exception e)
                        {
                            string msg = e.Message;
                        }
                        finally
                        {
                            con.Close();
                        }
                    }
                }
            }
            else
            {
                ConnectionStringSettings getString = WebConfigurationManager.ConnectionStrings["ConnDB"] as ConnectionStringSettings;

                if (getString != null)
                {
                    using (SqlConnection con = new SqlConnection(getString.ConnectionString))
                    {
                        try
                        {
                            SqlCommand cmd = new SqlCommand("sp_BloqueiaPlano", con);
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@CodigoEmpresa", plano.CodigoEmpresa);
                            cmd.Parameters.AddWithValue("@CodigoPlano", plano.CodigoPlano);
                            cmd.Parameters.AddWithValue("@PlanoBloqueado", plano.PlanoBloqueado);

                            con.Open();

                            cmd.ExecuteNonQuery();
                        }
                        catch (Exception e)
                        {
                            string msg = e.Message;
                        }
                        finally
                        {
                            con.Close();
                        }
                    }
                }
            }
        }

        public void BloquearAbaixoCusto(Custo custo)
        {
            if (custo.CodigoEmpresa == 3140 || custo.CodigoEmpresa == 3610)
            {      
                ConnectionStringSettings getString = WebConfigurationManager.ConnectionStrings["DBMOC"] as ConnectionStringSettings;

                if (getString != null)
                {
                    using (SqlConnection con = new SqlConnection(getString.ConnectionString))
                    {
                        try
                        {
                            SqlCommand cmd = new SqlCommand("sp_BloqueiaAbaixoCusto", con);
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@CodigoEmpresa", custo.CodigoEmpresa);
                            cmd.Parameters.AddWithValue("@CodigoLocal", custo.CodigoLocal);
                            cmd.Parameters.AddWithValue("@Bloqueado", custo.Bloqueado);

                            con.Open();

                            cmd.ExecuteNonQuery();
                        }
                        catch (Exception e)
                        {
                            string msg = e.Message;
                        }
                        finally
                        {
                            con.Close();
                        }
                    }
                }

            }else if (custo.CodigoEmpresa == 260)
            {
                ConnectionStringSettings getString = WebConfigurationManager.ConnectionStrings["DB60"] as ConnectionStringSettings;

                if (getString != null)
                {
                    using (SqlConnection con = new SqlConnection(getString.ConnectionString))
                    {
                        try
                        {
                            SqlCommand cmd = new SqlCommand("sp_BloqueiaAbaixoCusto", con);
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@CodigoEmpresa", custo.CodigoEmpresa);
                            cmd.Parameters.AddWithValue("@CodigoLocal", custo.CodigoLocal);
                            cmd.Parameters.AddWithValue("@Bloqueado", custo.Bloqueado);

                            con.Open();

                            cmd.ExecuteNonQuery();
                        }
                        catch (Exception e)
                        {
                            string msg = e.Message;
                        }
                        finally
                        {
                            con.Close();
                        }
                    }
                }
            }
            else
            {
                ConnectionStringSettings getString = WebConfigurationManager.ConnectionStrings["ConnDB"] as ConnectionStringSettings;

                if (getString != null)
                {
                    using (SqlConnection con = new SqlConnection(getString.ConnectionString))
                    {
                        try
                        {
                            SqlCommand cmd = new SqlCommand("sp_BloqueiaAbaixoCusto", con);
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@CodigoEmpresa", custo.CodigoEmpresa);
                            cmd.Parameters.AddWithValue("@CodigoLocal", custo.CodigoLocal);
                            cmd.Parameters.AddWithValue("@Bloqueado", custo.Bloqueado);

                            con.Open();

                            cmd.ExecuteNonQuery();
                        }
                        catch (Exception e)
                        {
                            string msg = e.Message;
                        }
                        finally
                        {
                            con.Close();
                        }
                    }
                }
            }
        }


        public void BloquearDescMinimo(DescMinino desc)
        {
            /*
             * EXEC sp_BloqueiaDescMinimo 930, 0, 'F', '51,00'
             * @CodigoEmpresa numeric(4),
             * @CodigoLocal numeric(1),
             * @Bloqueado char(1),
             * @ValorMin char(5)
             */

            if (desc.CodigoEmpresa == 3140 || desc.CodigoEmpresa == 3610)
            {            
                ConnectionStringSettings getString = WebConfigurationManager.ConnectionStrings["DBMOC"] as ConnectionStringSettings;

                if (getString != null)
                {
                    using (SqlConnection con = new SqlConnection(getString.ConnectionString))
                    {
                        try
                        {
                            SqlCommand cmd = new SqlCommand("sp_BloqueiaDescMinimo", con);
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@CodigoEmpresa", desc.CodigoEmpresa);
                            cmd.Parameters.AddWithValue("@CodigoLocal", desc.CodigoLocal);
                            cmd.Parameters.AddWithValue("@Bloqueado", desc.Bloqueado);
                            cmd.Parameters.AddWithValue("@ValorMin", desc.ValorMin);

                            con.Open();

                            cmd.ExecuteNonQuery();
                        }
                        catch (Exception e)
                        {
                            string msg = e.Message;
                        }
                        finally
                        {
                            con.Close();
                        }
                    }
                }
            }else if (desc.CodigoEmpresa == 260)
            {
                ConnectionStringSettings getString = WebConfigurationManager.ConnectionStrings["DB60"] as ConnectionStringSettings;

                if (getString != null)
                {
                    using (SqlConnection con = new SqlConnection(getString.ConnectionString))
                    {
                        try
                        {
                            SqlCommand cmd = new SqlCommand("sp_BloqueiaDescMinimo", con);
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@CodigoEmpresa", desc.CodigoEmpresa);
                            cmd.Parameters.AddWithValue("@CodigoLocal", desc.CodigoLocal);
                            cmd.Parameters.AddWithValue("@Bloqueado", desc.Bloqueado);
                            cmd.Parameters.AddWithValue("@ValorMin", desc.ValorMin);

                            con.Open();

                            cmd.ExecuteNonQuery();
                        }
                        catch (Exception e)
                        {
                            string msg = e.Message;
                        }
                        finally
                        {
                            con.Close();
                        }
                    }
                }
            }
            else
            {
                ConnectionStringSettings getString = WebConfigurationManager.ConnectionStrings["ConnDB"] as ConnectionStringSettings;

                if (getString != null)
                {
                    using (SqlConnection con = new SqlConnection(getString.ConnectionString))
                    {
                        try
                        {
                            SqlCommand cmd = new SqlCommand("sp_BloqueiaDescMinimo", con);
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@CodigoEmpresa", desc.CodigoEmpresa);
                            cmd.Parameters.AddWithValue("@CodigoLocal", desc.CodigoLocal);
                            cmd.Parameters.AddWithValue("@Bloqueado", desc.Bloqueado);
                            cmd.Parameters.AddWithValue("@ValorMin", desc.ValorMin);

                            con.Open();

                            cmd.ExecuteNonQuery();
                        }
                        catch (Exception e)
                        {
                            string msg = e.Message;
                        }
                        finally
                        {
                            con.Close();
                        }
                    }
                }
            }
        }
    }
}