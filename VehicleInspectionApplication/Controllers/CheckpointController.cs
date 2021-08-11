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
    public class CheckpointController : ApiController
    {
        // GET: api/Checkpoint
        public IEnumerable<Checkpoint> Get(int ckpGroupId, string vehicleType)
        {
            return CheckpointMdl.GetCheckpoints(ckpGroupId, vehicleType);
        }
    }
}
