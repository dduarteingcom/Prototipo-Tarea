namespace API.Models
{
    public class Root
    {
        public List<Cliente> clientes { get; set; }
        public List<Admin> administradores { get; set; }
        public List<Chef> chefs { get; set; }
        public List<Pedido> pedidos { get; set; }
        public List<Plato> platos { get; set; }
        public List<Factura> facturas { get; set; }

        public List<Menu> menus { get; set; }
    }
}
