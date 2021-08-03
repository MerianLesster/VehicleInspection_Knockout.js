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
    public class InspectionController : ApiController
    {
        // POST: api/Inspection
        public HttpResponseMessage Post(Inspection inspection)
        {
            InspectionMdl.CreateInspection(inspection);
            var response = Request.CreateResponse(HttpStatusCode.Created, inspection);
            string url = Url.Link("DefaultApi", new { inspection.Id });
            response.Headers.Location = new Uri(url);
            return response;
        }
    }
}
