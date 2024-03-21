using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace API.Controllers
{
    [ApiController]
    [Route("menu")]
    public class MenuController : ControllerBase
    {
        [HttpGet]
        [Route("mostrarPlatosDisponibles")]
        public dynamic mostrarPlatosDisponibles()
        {
            string json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<dynamic>(json);

            var menuIds = new List<int>(data.menu[0].platos.ToObject<int[]>());
            var platos = new List<dynamic>();

            foreach (var plato in data.platos)
            {
                if (menuIds.Contains((int)plato.Id))
                {
                    platos.Add(plato);
                }
            }

            return platos;
        }

        [HttpPost]
        [Route("agregarPlatoAlMenu")]
        public void agregarPlatoAlMenu(int id)
        {
            string json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<dynamic>(json);

            data.menu[0].platos.Add(id);

            string output = JsonConvert.SerializeObject(data, Formatting.Indented);
            System.IO.File.WriteAllText("database.json", output);
        }

        [HttpDelete]
        [Route("eliminarPlatoDelMenu")]
        public void eliminiarPlatoDelMenu(int id)
        {
            string json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<dynamic>(json);

            List<int> platos = data.menu[0].platos.ToObject<List<int>>();
            platos.Remove(id);
            data.menu[0].platos = JArray.FromObject(platos);

            string output = JsonConvert.SerializeObject(data, Formatting.Indented);
            System.IO.File.WriteAllText("database.json", output);
        }

    }
}
