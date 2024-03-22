namespace API.Models
{
    public class FacturaRequest
    {
        public string cliente { get; set; }
        public List<int> pedidos { get; set; }
        public int montoTotal { get; set; }

    }
}
