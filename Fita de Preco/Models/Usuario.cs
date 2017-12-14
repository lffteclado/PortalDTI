using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Fita_de_Preco.Models
{
    public class Usuario
    {
        public int IDUsario { get; set; }

        public static string nomeUsu = "VDL";

        public static string senhaUsu = "!senha@123";

        [DisplayName("Funcionário")]
        public int IDFuncionario { get; set; }

        [Required(ErrorMessage = "Informe o Email!")]
        [MaxLength(30)]
        [EmailAddress(ErrorMessage = "E-mail em formato inválido!")]
        [DisplayName("Email")]
        public string Email { get; set; }

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