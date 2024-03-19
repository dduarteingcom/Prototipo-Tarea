using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using API.Models;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace API.Controllers
{
    [ApiController]
    [Route("cliente")]

    public class ClienteController : ControllerBase
    {
        [HttpGet]
        [Route("encontrarCedula")]
        public dynamic encontrarCedula(int cedula)
        {
            string json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<dynamic>(json);

            // Buscar entre los administradores
            foreach (var cliente in data.clientes)
            {
                if (cliente.cedula == cedula)
                {
                    return cliente;
                }
            }

            return null;
        }
    }
}