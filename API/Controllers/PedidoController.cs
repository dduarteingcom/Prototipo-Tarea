using API.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;

namespace API.Controllers
{
    [ApiController]
    [Route("pedido")]
    public class PedidoController : ControllerBase
    {
        [HttpPost]
        [Route("agregarPedido")]
        public IActionResult AgregarPedido(int cliente, List<int> platos)
        {
            DateTime hora = DateTime.Now;

            // Obtén el objeto JSON completo
            var json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<Root>(json);

            // Accede a la lista de facturas, pedidos y platos
            var listaFacturas = data.facturas;
            var listaPedidos = data.pedidos;
            var listaPlatos = data.platos;

            // Crea un nuevo objeto factura
            var nuevoPedido = new Pedido
            {
                Id = (listaPedidos.Count + 1), // Genera el Id basado en la cantidad de pedidos existentes
                cliente = cliente,
                chef = null,
                platos = platos,
                estado = true,
                horaDePedido = hora.ToString("HH:mm:ss")
            };

            // Calcula el monto total del pedido
            int montoTotal = 0;
            int tiempo = 0;
            foreach (var platoId in platos)
            {
                var plato = listaPlatos.First(p => p.Id == platoId);
                montoTotal += plato.precio;
                tiempo += plato.duracion;
            }

            nuevoPedido.monto = montoTotal;
            nuevoPedido.tiempoPreparacion = tiempo;

            // Convierte el objeto Factura a un objeto dinámico
            var nuevoPedidoDinamico = JsonConvert.DeserializeObject<Pedido>(JsonConvert.SerializeObject(nuevoPedido));

            // Añade la nueva factura a la lista
            listaPedidos.Add(nuevoPedidoDinamico);

            // Configura los ajustes de serialización
            var settings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented, // Esto hará que el JSON se formatee con indentación
                TypeNameHandling = TypeNameHandling.Auto
            };

            // Guarda la lista actualizada de facturas en el archivo JSON
            System.IO.File.WriteAllText("database.json", JsonConvert.SerializeObject(data, settings));

            return Ok(nuevoPedido);
        }
    }
}
