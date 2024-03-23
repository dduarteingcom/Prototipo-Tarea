using API.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
    [ApiController]
    [Route("admin")]

    public class AdminController : ControllerBase
    {
        [HttpGet]
        [Route("obtenerPedidosActivos")]
        public IActionResult ObtenerPedidosActivos()
        {
            // Leer el archivo json
            var json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<Root>(json);

            // Filtrar los pedidos cuyo estado sea true
            var pedidosActivos = data.pedidos.Where(p => p.estado == true).ToList();

            if (pedidosActivos.Count == 0)
            {
                return NotFound();
            }

            return Ok(pedidosActivos);
        }
    }
}
