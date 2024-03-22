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
        public IActionResult AgregarFactura([FromBody] FacturaRequest facturaRequest)
        {
            DateTime date = DateTime.Now;

            // Obtén el objeto JSON completo
            var json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<dynamic>(json);

            // Accede a la lista de facturas, pedidos y platos
            var listaFacturas = data.facturas;

            // Crea un nuevo objeto factura
            var nuevaFactura = new Factura
            {
                Id = (listaFacturas.Count + 1), // Genera el Id basado en la cantidad de facturas existentes
                cliente = facturaRequest.cliente,
                fecha = new Fecha
                {
                    dia = date.Day.ToString(),
                    mes = date.Month.ToString(),
                    año = date.Year.ToString()
                },
                hora = date.ToString("HH:mm:ss"),
                pedidos = facturaRequest.pedidos,
                montoTotal = facturaRequest.montoTotal
            };

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


            // Buscar entre los administradores
            foreach (var factura in data.facturas)
            {
                if (factura.Id == nuevaFactura.Id)
                {
                    return factura;
                }
            }

            return null;


        }




    }
}
