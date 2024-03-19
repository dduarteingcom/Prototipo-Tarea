using API.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
    [ApiController]
    [Route("usuario")]
    public class UsuarioController : ControllerBase
    {

        [HttpGet]
        [Route("encontrarCorreoPasswd")]
        public dynamic encontrarCorreoPasswd(string correo, string password)
        {
            string json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<dynamic>(json);

            // Buscar entre los administradores
            foreach (var admin in data.administradores)
            {
                if (admin.correo == correo && admin.contraseña == password)
                {
                    return new { tipo = "admin", admin};
                }
            }

            // Buscar entre los chefs
            foreach (var chef in data.chefs)
            {
                if (chef.correo == correo && chef.contraseña == password)
                {
                    return new { tipo = "chef", chef };

                }
            }

            return null;
        }
    }
}