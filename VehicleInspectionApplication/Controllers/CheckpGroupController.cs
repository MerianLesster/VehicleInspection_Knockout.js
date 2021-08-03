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
    public class CheckpGroupController : ApiController
    {
        // GET: api/CheckpGroup
        public IEnumerable<CheckpointGroup> Get()
        {
            return CheckpGroupMdl.GetCheckpGroups();
        }
    }
}
