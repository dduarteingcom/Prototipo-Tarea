﻿using API.Models;
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
        public IActionResult agarrarPlato(int id, string correo)
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
            var chef = data.chefs.FirstOrDefault(p => p.correo == correo);
            if (chef.pedidosAsigandos == null)
            {
                chef.pedidosAsigandos = new List<int>();
            }
            chef.pedidosAsigandos.Add(id);



            // Guardar los cambios en el archivo json
            json = JsonConvert.SerializeObject(data, Formatting.Indented);
            System.IO.File.WriteAllText("database.json", json);

            return Ok(pedido);
        }

        [HttpGet]
        [Route("mostrarTodosPedidos")]
        public dynamic mostrarTodosPedidos()
        {
            string json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<dynamic>(json);


            return data.pedidos;
        }

        [HttpPut]
        [Route("terminarPedido")]
        public IActionResult terminarPedido(int id)
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

            if (pedido.estado == true)
            {
                pedido.estado = false;
            }

            // Guardar los cambios en el archivo json
            json = JsonConvert.SerializeObject(data, Formatting.Indented);
            System.IO.File.WriteAllText("database.json", json);

            return Ok(pedido);
        }

        [HttpGet]
        [Route("obtenerPedidosActivosOtrosChef")]
        public IActionResult ObtenerPedidosActivosOtrosChef(string correo)
        {
            // Leer el archivo json
            var json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<Root>(json);

            // Filtrar los pedidos cuyo estado sea true
            var pedidosActivos = data.pedidos.Where(p => p.estado == true && p.chef != correo && p.chef != null).ToList();

            if (pedidosActivos.Count == 0)
            {
                return NotFound();
            }

            return Ok(pedidosActivos);
        }






    }
}
