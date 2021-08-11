using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataAccessLayer.EntityDataModel;
using DataAccessLayer.Models;

namespace VehicleInspectionApplication.Controllers
{
    public class MakeController : ApiController
    {
        // GET: api/Make
        public IEnumerable<Make> Get()
        {
            return MakeMdl.GetMakes();
        }
    }
}
