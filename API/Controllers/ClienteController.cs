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
        [Route("encontrarPorCedula")]
        public dynamic encontrarPorCedula(int cedula)
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

        [HttpGet]
        [Route("encontrarCorreoPasswd")]
        public dynamic encontrarCorreoPasswd(string correo, string password)
        {
            string json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<Root>(json);

            // Buscar entre los administradores
            foreach (var cliente in data.clientes)
            {
                if (cliente.correo == correo && cliente.contraseña == password)
                {
                    return cliente;
                }
            }

            return null;
        }

    
        [HttpPost]
        [Route("agregarCliente")]
        public IActionResult agregarCliente(int cedula, string primerNombre, string apellido1, string apellido2, string correo, string contraseña, string distrito, string canton, string provincia, string fechaNacimiento, List<int> telefonos)
        {
            // Obtén el objeto JSON completo
            var json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<dynamic>(json);

            // Accede a la lista de platos
            var listaClientes = data.clientes;

            // Crea un nuevo plato
            var nuevoCliente = new Cliente
            {
                cedula = cedula,
                nombre = new Nombre
                {
                    primerNombre = primerNombre,
                    apellido1 = apellido1,
                    apellido2 = apellido2,
                },
                correo = correo,
                contraseña = contraseña,
                direccion = new Direccion
                {
                    distrito = distrito,
                    cantón = canton,
                    provincia = provincia,
                },
                fechaNacimiento = fechaNacimiento,
                telefonos = telefonos,
                menu = 1,
                carrito = null,
                pedidos = null

            };

            // Convierte el objeto Plato a un objeto dinámico
            var nuevoClienteDinamico = JsonConvert.DeserializeObject<dynamic>(JsonConvert.SerializeObject(nuevoCliente));

            // Añade el nuevo plato a la lista
            listaClientes.Add(nuevoClienteDinamico);

            // Configura los ajustes de serialización
            var settings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented, // Esto hará que el JSON se formatee con indentación
                TypeNameHandling = TypeNameHandling.Auto
            };

            // Guarda la lista actualizada de platos en el archivo JSON
            System.IO.File.WriteAllText("database.json", JsonConvert.SerializeObject(data, settings));

            return Ok(nuevoCliente);


        }
        [HttpPut]
        [Route("modificarContraseña")]
        public IActionResult modificarContraseña(int cedula, string nuevaContraseña)
        {
            // Leer el archivo json
            var json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<Root>(json);

            // Buscar el plato con el id proporcionado
            var cliente = data.clientes.FirstOrDefault(p => p.cedula == cedula);
            if (cliente == null)
            {
                return NotFound();
            }

            // Actualizar los datos del plato
            cliente.contraseña = nuevaContraseña;
            // Guardar los cambios en el archivo json
            json = JsonConvert.SerializeObject(data, Formatting.Indented);
            System.IO.File.WriteAllText("database.json", json);

            return Ok(cliente);
        }

        [HttpPost]
        [Route("eliminarCliente")]

        public IActionResult eliminarCliente(int cedula)
        {
            var json = System.IO.File.ReadAllText("database.json");
            var data = JsonConvert.DeserializeObject<dynamic>(json);

            var listaClientes = data.clientes;

            for (int i = 0; i < listaClientes.Count; i++)
            {
                if (listaClientes[i].cedula == cedula)
                {
                    listaClientes.RemoveAt(i);
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