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

        [HttpPut]
        [Route("agarrarPedido")]
        public IActionResult UpdatePlato(int id, string correo)
        {
            // Leer el archivo json
            var json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<Root>(json);

            // Buscar el plato con el id proporcionado
            var pedido = data.pedidos.FirstOrDefault(p => p.Id == id);
            if (pedido == null)
            {
                return NotFound();
            }

            // Actualizar los datos del plato
            pedido.chef = correo;
            pedido.estado = true;

            // Guardar los cambios en el archivo json
            json = JsonConvert.SerializeObject(data, Formatting.Indented);
            System.IO.File.WriteAllText("database.json", json);

            return Ok(pedido);
        }




    }
}
