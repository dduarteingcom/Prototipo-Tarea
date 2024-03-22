namespace API.Models
{
    public class Pedido
    {
        public int Id { get; set; }
        public int cliente { get; set; }
        public string chef { get; set; }
        public List<int> platos { get; set; }

        public string horaDePedido { get; set; }

        public int tiempoPreparacion { get; set; }

        public bool estado { get; set; }

        public int monto { get; set; }
    }
}