
namespace API.Models
{
    //Modelo de cliente con sus respectivos atributos
    public class Cliente : Usuario
    {
        public int cedula { get; set; }
        public Nombre nombre { get; set; }
        public string correo { get; set; }
        public string contraseña { get; set; }
        public Direccion direccion { get; set; }
        public string fechaNacimiento { get; set; }
        public List<int> telefonos { get; set; }
        public List<int> pedidos { get; set; }
        public int pedidosRealizados { get; set; }
    }
}
