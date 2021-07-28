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
    public class ModelController : ApiController
    {
        // GET: api/Model
        //public IEnumerable<Model> Get()
        //{
        //    return ModelMdl.GetModels();
        //}

        // GET: api/Model/audi
        public IEnumerable<Model> Get(string makeName)
        {
            return ModelMdl.GetModels(makeName);
        }

    }
}
