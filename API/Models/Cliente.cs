
namespace API.Models
{
    public class Cliente : Usuario
    {
        public int cedula { get; set;}
        public Nombre nombre { get; set;}

        public string correo { get; set;}

        public string contraseña { get; set;}

        public Direccion direccion { get; set;}

        public string fechaNacimiento { get; set; }

        public List<int> telefonos { get; set; }

        public Menu menu { get; set; }

        public Carrito carrito { get; set; }

        public List<Pedido> pedidos { get; set; }

    }
}
