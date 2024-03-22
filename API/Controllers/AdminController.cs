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

        [HttpGet]
        [Route("mostrarTopPlatos")]
        public dynamic mostrarTopPlatos()
        {
            string json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<Root>(json);

            // Ordenamos los platos por ventas de mayor a menor
            var topPlatos = data.platos.OrderByDescending(p => (int)p.ventas).Take(10);

            return topPlatos;
        }

        [HttpGet]
        [Route("mostrarTopGanancias")]
        public dynamic mostrarTopGanancias()
        {
            string json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<Root>(json);

            // Calculamos la ganancia de cada plato y luego ordenamos de mayor a menor
            var topGanancias = data.platos.Select(p => new
            {
                plato = p,
                ganancia = (int)p.ventas * (int)p.precio
            })
            .OrderByDescending(g => g.ganancia)
            .Take(10)
            .Select(g => g.plato);

            return topGanancias;
        }

        [HttpGet]
        [Route("mostrarTopClientes")]
        public dynamic mostrarTopClientes()
        {
            string json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<Root>(json);

            // Ordenamos los platos por ventas de mayor a menor
            var topClientes = data.clientes.OrderByDescending(p => (int)p.pedidosRealizados).Take(10);

            return topClientes;
        }


    }
}
