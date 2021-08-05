using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VehicleInspectionApplication.EntityDataModel;


namespace VehicleInspectionApplication.Models
{
    public class InspecCheckpointMdl
    {
        private static InspectionDBEntities2 _Db;
        private static InspectionDBEntities2 Db
        {
            get { return _Db ?? (_Db = new InspectionDBEntities2()); }
        }

        // Add InspectionCheckpoint
        public static void AddInspecCheckpoint(InspectionCheckpoint inspectionCheckpoint)
        {
            Db.InspectionCheckpoints.Add(inspectionCheckpoint);
            Db.SaveChanges();
        }

        // Get InspectionCheckpoint based on the Inspection Id
        public static IQueryable<InspectionCheckpoint> GetInspectionCheckpoint(int inspecId)
        {
            Db.Configuration.ProxyCreationEnabled = false;
            Db.Configuration.LazyLoadingEnabled = true;
            var query = from inspectionCheckpoints in Db.InspectionCheckpoints.Include("Checkpoint").Include("Inspection").Where(arr => arr.InspecId == inspecId) select inspectionCheckpoints;
            return query;
        }
    }
}