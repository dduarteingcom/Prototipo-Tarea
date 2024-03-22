using API.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
    [ApiController]
    [Route("plato")]

    public class PlatoController : ControllerBase
    {
        [HttpPost]
        [Route("agregarPlato")]
        public IActionResult AddPlato([FromBody] PlatoRequest platoRequest)
        {
            // Obtén el objeto JSON completo
            var json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<dynamic>(json);

            // Accede a la lista de platos
            var listaPlatos = data.platos;

            // Obtiene el Id del último plato en la lista
            int ultimoId = listaPlatos[listaPlatos.Count - 1].Id;

            // Crea un nuevo plato
            var nuevoPlato = new Plato
            {
                Id = (ultimoId + 1), // Genera el Id basado en el Id del último plato
                nombre = platoRequest.nombre,
                tipo = platoRequest.tipo,
                calorias = platoRequest.calorias,
                precio = platoRequest.precio,
                ingredientes = platoRequest.ingredientes,
                duracion = platoRequest.duracion,
                descripcion = platoRequest.descripcion,
                ventas = 0
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

        [HttpPut]
        [Route("modificarPlato")]
        public IActionResult UpdatePlato(int id, string nuevoNombre, string nuevoTipo, int nuevoCalorias, int nuevoPrecio, string nuevaDescripcion)
        {
            // Leer el archivo json
            var json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<Root>(json);

            // Buscar el plato con el id proporcionado
            var plato = data.platos.FirstOrDefault(p => p.Id == id);
            if (plato == null)
            {
                return NotFound();
            }

            // Actualizar los datos del plato
            plato.nombre = nuevoNombre;
            plato.tipo = nuevoTipo;
            plato.calorias = nuevoCalorias;
            plato.precio = nuevoPrecio;
            plato.descripcion = nuevaDescripcion;

            // Guardar los cambios en el archivo json
            json = JsonConvert.SerializeObject(data, Formatting.Indented);
            System.IO.File.WriteAllText("database.json", json);

            return Ok(plato);
        }

        [HttpGet]
        [Route("mostrarPlatos")]
        public dynamic mostrarPlatos()
        {
            string json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<dynamic>(json);

            
            return data.platos;
        }

        [HttpGet]
        [Route("mostrarIdPlatos")]
        public dynamic mostrarIdPlatos()
        {
            string json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<dynamic>(json);
            var ids = new List<int>();

            foreach (var plato in data.platos)
            {
                ids.Add((int)plato.Id);
            }

            return ids;
        }

        [HttpDelete]
        [Route("eliminarPlato")]

        public IActionResult eliminarPlato(int id)
        {
            var json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<dynamic>(json);

            var listaPlatos = data.platos;

            for (int i = 0; i < listaPlatos.Count; i++)
            {
                if (listaPlatos[i].Id == id)
                {
                    listaPlatos.RemoveAt(i);
                    break;
                }
            }

            var settings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented, // Esto hará que el JSON se formatee con indentación
                TypeNameHandling = TypeNameHandling.Auto
            };
            System.IO.File.WriteAllText("database.json", JsonConvert.SerializeObject(data, settings));

            return Ok();
        }


    }
}