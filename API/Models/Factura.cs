namespace API.Models
{
    public class Factura
    {
        public int Id { get; set; }
        public string fecha { get;  set; }

        public string hora { get; set; }

        public List<Pedido> pedidos { get; set; }

        public int montoTotal { get; set; }

    }
}
