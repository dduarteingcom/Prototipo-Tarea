namespace API.Models
{
    public class Chef : Usuario
    {
        public List<Pedido> pedidosAsignados { get; set; }
    }
}
