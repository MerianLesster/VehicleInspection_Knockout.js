using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VehicleInspectionApplication.EntityDataModel;

namespace VehicleInspectionApplication.Models
{
    public class CheckpointMdl
    {
        private static InspectionDBEntities2 _Db;
        private static InspectionDBEntities2 Db
        {
            get { return _Db ?? (_Db = new InspectionDBEntities2()); }
        }

        /// <summary>
        /// Gets the Checkpoints.
        /// </summary>
        /// <returns>IEnumerable Checkpoint List</returns>
        public static IQueryable<Checkpoint> GetCheckpoints(int ckpGroupId, string vehicleType)
        {
            Db.Configuration.ProxyCreationEnabled = false;
            var query = from checkpoints in Db.Checkpoints where (checkpoints.CkpGroupId == ckpGroupId && checkpoints.VehicleType == vehicleType) select checkpoints;
            return query;
        }
    }
}