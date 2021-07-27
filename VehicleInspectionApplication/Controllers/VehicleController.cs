using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VehicleInspectionApplication.EntityDataModel;
using VehicleInspectionApplication.Models;

namespace VehicleInspectionApplication.Controllers
{
    public class VehicleController : ApiController
    {
        // GET: api/Vehicle
        public IEnumerable<Vehicle> Get()
        {
            return VehicleModel.GetVehicles();
        }

        // GET: api/Vehicle/5
        public Vehicle Get(int id)
        {
            return VehicleModel.GetVehicles().FirstOrDefault(s => s.Id == id);
        }

        // POST: api/Vehicle
        public HttpResponseMessage Post(Vehicle vehicle)
        {
            VehicleModel.InsertVehicle(vehicle);
            var response = Request.CreateResponse(HttpStatusCode.Created, vehicle);
            string url = Url.Link("DefaultApi", new { vehicle.Id });
            response.Headers.Location = new Uri(url);
            return response;
        }

        // DELETE api/Vehicle/5
        public HttpResponseMessage Delete(int id)
        {
            VehicleModel.DeleteVehicle(id);
            var response = Request.CreateResponse(HttpStatusCode.OK, id);
            return response;
        }

        // PUT: api/Vehicle/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}


    }
}
