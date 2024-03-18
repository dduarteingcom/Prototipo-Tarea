using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using API.Models;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace API.Controllers
{
    public class Clientes
    {
        public List<Cliente> clientes { get; set; }
    }

    [ApiController]
    [Route("cliente")]

    public class ClienteController : ControllerBase
    {

        [HttpGet]
        [Route("encontrarCedula")]

        public dynamic encontrarCedula(int cedula)
        {
            string json = System.IO.File.ReadAllText("database.json");
            Clientes clientes = JsonConvert.DeserializeObject<Clientes>(json);

            foreach (Cliente cliente in clientes.clientes)
            {
                if (cliente.cedula == cedula)
                {
                    return cliente.nombre.primerNombre;
                }
            }

            return null;
        }

        [HttpGet]
        [Route("encontrarPrimerNombre")]

        public dynamic encontrarPrimerNombre(string nombre)
        {
            string json = System.IO.File.ReadAllText("database.json");
            Clientes clientes = JsonConvert.DeserializeObject<Clientes>(json);

            List<Cliente> clientesCoincidentes = new List<Cliente>();

            foreach (Cliente cliente in clientes.clientes)
            {
                if (cliente.nombre.primerNombre == nombre)
                {
                    clientesCoincidentes.Add(cliente);
                }
            }

            return clientesCoincidentes.Count > 0 ? clientesCoincidentes : null;
        }

        [HttpPut]
        [Route("modificarPrimerNombre")]
        public dynamic modificarNombre(int cedula, string nuevoNombre)
        {
            string path = "database.json";
            string json = System.IO.File.ReadAllText(path);
            Clientes clientes = JsonConvert.DeserializeObject<Clientes>(json);

            foreach (Cliente cliente in clientes.clientes)
            {
                if (cliente.cedula == cedula)
                {
                    cliente.nombre.primerNombre = nuevoNombre;

                    // Sobrescribe el archivo JSON con los datos actualizados
                    string jsonActualizado = JsonConvert.SerializeObject(clientes, Formatting.Indented);
                    System.IO.File.WriteAllText(path, jsonActualizado);

                    return cliente;
                }
            }
            return null;
        }
        [HttpGet]
        [Route("mostrarClientes")]

        public dynamic mostrarClientes()
        {
            string json = System.IO.File.ReadAllText("database.json");
            Clientes clientes = JsonConvert.DeserializeObject<Clientes>(json);

            List<Cliente> clientesCoincidentes = new List<Cliente>();

            foreach (Cliente cliente in clientes.clientes)
            {
                if (cliente != null)
                {
                    clientesCoincidentes.Add(cliente);
                }
            }

            return clientesCoincidentes.Count > 0 ? clientesCoincidentes : null;
        }
    }
}
