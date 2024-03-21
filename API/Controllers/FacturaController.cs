using API.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
    [ApiController]
    [Route("factura")]
    public class FacturaController : ControllerBase
    {
        [HttpPost]
        [Route("agregarFactura")]
        public IActionResult AgregarFactura(int cedula, string dia, string mes, string año, string hora, List<int> pedidos)
        {
            // Obtén el objeto JSON completo
            var json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<Root>(json);

            // Accede a la lista de facturas, pedidos y platos
            var listaFacturas = data.facturas;
            var listaPedidos = data.pedidos;
            var listaPlatos = data.platos;

            // Crea un nuevo objeto factura
            var nuevaFactura = new Factura
            {
                Id = (listaFacturas.Count + 1), // Genera el Id basado en la cantidad de facturas existentes
                cedula = cedula,
                fecha = new Fecha
                {
                    dia = dia,
                    mes = mes,
                    año = año
                },
                hora = hora,
                pedidos = pedidos,
            };

            // Calcula el monto total de la factura
            int montoTotal = 0;
            foreach (var pedidoId in pedidos)
            {
                var pedido = listaPedidos.First(p => p.Id == pedidoId);
                foreach (var platoId in pedido.platos)
                {
                    var plato = listaPlatos.First(p => p.Id == platoId);
                    montoTotal += plato.precio;
                }
            }
            nuevaFactura.montoTotal = montoTotal;

            // Convierte el objeto Factura a un objeto dinámico
            var nuevoFacturaDinamico = JsonConvert.DeserializeObject<Factura>(JsonConvert.SerializeObject(nuevaFactura));

            // Añade la nueva factura a la lista
            listaFacturas.Add(nuevoFacturaDinamico);

            // Configura los ajustes de serialización
            var settings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented, // Esto hará que el JSON se formatee con indentación
                TypeNameHandling = TypeNameHandling.Auto
            };

            // Guarda la lista actualizada de facturas en el archivo JSON
            System.IO.File.WriteAllText("database.json", JsonConvert.SerializeObject(data, settings));

            return Ok(nuevaFactura);
        }


    }
}
