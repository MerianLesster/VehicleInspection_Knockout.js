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
    public class InspecCheckpointController : ApiController
    {
        // POST: api/InspecCheckpoint
        public HttpResponseMessage Post(InspectionCheckpoint inspecCheckpoint)
        {
            InspecCheckpointMdl.AddInspecCheckpoint(inspecCheckpoint);
            var response = Request.CreateResponse(HttpStatusCode.Created, inspecCheckpoint);
            //string url = Url.Link("DefaultApi", new { inspecCheckpoint.Id });
            //response.Headers.Location = new Uri(url);
            return response;
        }

        public IEnumerable<InspectionCheckpoint> Get(int inspecId)
        {
            return InspecCheckpointMdl.GetInspectionCheckpoint(inspecId);
        }
    }
}
