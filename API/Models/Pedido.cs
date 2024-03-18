namespace API.Models
{
    public class Pedido
    {
        public int Id { get; set; } 
        public Cliente cliente { get; set; }
        public Chef chef { get; set; }  
        public List<Plato> platos { get; set; }

        public int tiempoPreparacion {  get; set; } 

        public bool estado { get; set; }

    }
}