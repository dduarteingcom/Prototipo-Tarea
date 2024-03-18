namespace API.Models
{
    public class Pedido
    {
        public Cliente cliente { get; set; }
        public Chef Chef { get; set; }  
        public List<Plato> Platos { get; set; }

        public int tiempoPreparacion {  get; set; } 

        public bool estado { get; set; }

    }
}