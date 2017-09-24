﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Fita_de_Preco.Models
{
    public class Usuario
    {
        public int IDUsario { get; set; }

        public static string nomeUsu = "VDL";

        public static string senhaUsu = "!senha@123";

        [DisplayName("Funcionário")]
        public int IDFuncionario { get; set; }

        [Required(ErrorMessage = "Informe o Nome de Usuário!")]
        [MaxLength(15)]
        [DataType(DataType.Text)]
        [DisplayName("Usuário")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Informe a Senha!")]
        [MaxLength(15)]
        [DataType(DataType.Password)]
        public string Senha { get; set; }

        [DataType(DataType.Password)]
        [MaxLength(15)]
        [Display(Name = "Confirmar Senha")]
        [Compare("Senha", ErrorMessage = "Senhas nao conferem!")]
        public string ConfirmPassword { get; set; }

        // lazy loading = add virtual
        //public virtual Funcionario Funcionario { get; set; }

    }
}