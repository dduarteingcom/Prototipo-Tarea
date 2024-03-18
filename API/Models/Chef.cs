namespace API.Models
{
    public class Chef : Usuario
    {
        public List<Pedido> pedidosAsigandos { get; set; }
    }
}
