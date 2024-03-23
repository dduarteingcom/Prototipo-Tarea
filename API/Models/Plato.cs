namespace API.Models
{
    public class Plato
    {   

        public int Id { get; set; }

        public string nombre { get; set; }

        public string tipo { get; set; }

        public int calorias { get; set; }

        public int precio { get; set; }

        public List<string> ingredientes { get; set; }

        public int duracion { get; set; }

        public string descripcion { get; set; }

        public int ventas { get; set; }

        public int estrellas { get; set; }

    }
}