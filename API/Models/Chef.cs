namespace API.Models
{
    //Modelo de chef
    public class Chef : Usuario
    {
        public List<int> pedidosAsigandos { get; set; }
    }
}
