﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Fita_de_Preco.Models
{
    public class Custo
    {
        public int CodigoEmpresa { get; set; }
        public int CodigoLocal { get; set; }
        public char Bloqueado { get; set; }
    }
}