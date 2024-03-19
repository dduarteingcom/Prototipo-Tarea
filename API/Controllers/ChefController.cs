using API.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
    [ApiController]
    [Route("chef")]

    public class ChefController : ControllerBase
    {
        [HttpGet]
        [Route("obtenerPedidosActivosChef")]
        public IActionResult ObtenerPedidosActivosChef(string correo)
        {
            // Leer el archivo json
            var json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<Root>(json);

            // Filtrar los pedidos cuyo estado sea true
            var pedidosActivos = data.pedidos.Where(p => p.estado == true && p.chef == correo).ToList();

            if (pedidosActivos.Count == 0)
            {
                return NotFound();
            }

            return Ok(pedidosActivos);
        }

        [HttpGet]
        [Route("obtenerPedidosDesasignados")]
        public IActionResult OobtenerPedidosDesasignado()
        {
            // Leer el archivo json
            var json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<Root>(json);

            // Filtrar los pedidos cuyo estado sea true
            var pedidosActivos = data.pedidos.Where(p => p.chef == null).ToList();

            if (pedidosActivos.Count == 0)
            {
                return NotFound();
            }

            return Ok(pedidosActivos);
        }



    }
}
