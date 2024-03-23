namespace API.Models
{
    //Modelo de cliente con atributos de la app web para transformarla al modelo de la DB
    public class ClienteRequest
    {
        public int cedula { get; set; }
        public string primerNombre { get; set; }
        public string apellido1 { get; set; }
        public string apellido2 { get; set; }
        public string correo { get; set; }
        public string contraseña { get; set; }
        public string distrito { get; set; }
        public string canton { get; set; }
        public string provincia { get; set; }
        public string fechaNacimiento { get; set; }
        public List<int> telefonos { get; set; }
    }
}
