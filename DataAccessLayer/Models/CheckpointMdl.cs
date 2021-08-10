using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DataAccessLayer.EntityDataModel;

namespace DataAccessLayer.Models
{
    public class CheckpointMdl
    {
        private static InspectionDBEntities2Entities _Db;
        private static InspectionDBEntities2Entities Db
        {
            get { return _Db ?? (_Db = new InspectionDBEntities2Entities()); }
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