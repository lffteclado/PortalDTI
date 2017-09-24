using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Fita_de_Preco.Models
{
    public class Concessionarias
    {
        public string CodConcessionaria { get; set; }
        public string NomeConcessionaria { get; set; }

        public List<Concessionarias> ListaConcessionarias()
        {
            return new List<Concessionarias>
            {
                new Concessionarias {CodConcessionaria = "1200", NomeConcessionaria = "Auto Sete" },
                new Concessionarias {CodConcessionaria = "262", NomeConcessionaria = "Calisto" },
                new Concessionarias {CodConcessionaria = "930", NomeConcessionaria = "Cardiesel" },
                new Concessionarias {CodConcessionaria = "2630", NomeConcessionaria = "Goias" },
                new Concessionarias {CodConcessionaria = "3140", NomeConcessionaria = "Montes Claros" },
                new Concessionarias {CodConcessionaria = "2890", NomeConcessionaria = "Posto Imperial" },
                new Concessionarias {CodConcessionaria = "130", NomeConcessionaria = "Vadiesel" },
                new Concessionarias {CodConcessionaria = "2620", NomeConcessionaria = "Uberlandia" },
                new Concessionarias {CodConcessionaria = "260", NomeConcessionaria = "Valadares" },
                new Concessionarias {CodConcessionaria = "3610", NomeConcessionaria = "Rede Mineira" }

            };
        }
    }
}