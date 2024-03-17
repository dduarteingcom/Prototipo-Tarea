namespace WebApplication1.Models
{
    public class Cliente
    {
        public int cedula { get; set;}
        public Nombre nombre { get; set;}

        public string correo { get; set;}

        public string contraseña { get; set;}

        public Direccion direccion { get; set;}

        public DateTime fechaNacimiento { get; set; }

        public List<int> telefonos { get; set; }

        public Menu menu { get; set; }

    }
}
