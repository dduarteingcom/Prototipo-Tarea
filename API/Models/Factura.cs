namespace API.Models
{
    public class Factura
    {
        public int Id { get; set; }

        public string cliente { get; set; }    

        public Fecha fecha { get;  set; }

        public string hora { get; set; }

        public List<int> pedidos { get; set; }

        public int montoTotal { get; set; }

    }
}
