using API.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
    public class Platos
    {
        public List<Plato> platos { get; set; }
    }

    [ApiController]
    [Route("plato")]

    public class PlatoController : ControllerBase
    {
        [HttpPost]
        [Route("agregarPlato")]
        public IActionResult AddPlato(string nombre, string tipo, int calorias, int precio)
        {
            // Obtén el objeto JSON completo
            var json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<dynamic>(json);

            // Accede a la lista de platos
            var listaPlatos = data.platos;

            // Crea un nuevo plato
            var nuevoPlato = new Plato
            {
                Id = (listaPlatos.Count + 1), // Genera el Id basado en la cantidad de platos existentes
                nombre = nombre,
                tipo = tipo,
                calorias = calorias,
                precio = precio
            };

            // Convierte el objeto Plato a un objeto dinámico
            var nuevoPlatoDinamico = JsonConvert.DeserializeObject<dynamic>(JsonConvert.SerializeObject(nuevoPlato));

            // Añade el nuevo plato a la lista
            listaPlatos.Add(nuevoPlatoDinamico);

            // Configura los ajustes de serialización
            var settings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented, // Esto hará que el JSON se formatee con indentación
                TypeNameHandling = TypeNameHandling.Auto
            };

            // Guarda la lista actualizada de platos en el archivo JSON
            System.IO.File.WriteAllText("database.json", JsonConvert.SerializeObject(data, settings));

            return Ok(nuevoPlato);
        }
    }
}
