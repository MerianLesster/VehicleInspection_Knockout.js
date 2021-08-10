using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DataAccessLayer.EntityDataModel;

namespace DataAccessLayer.Models
{
    public class InspectionMdl
    {
        private static InspectionDBEntities2Entities _inspectionDb;
        private static InspectionDBEntities2Entities InspectioneDb
        {
            get { return _inspectionDb ?? (_inspectionDb = new InspectionDBEntities2Entities()); }
        }

        /// <summary>
        /// Inserts new Inspection.
        /// </summary>
        /// <param name="inspection">The inspection object to insert.</param>
        public static void CreateInspection(Inspection inspection)
        {
            InspectioneDb.Inspections.Add(inspection);
            InspectioneDb.SaveChanges();
        }

        /// <summary>
        /// Update new Inspection.
        /// </summary>
        /// <param name="id">The inspection object id.</param>
        /// <param name="inspection">The inspection object to insert.</param>
        public static void UpdateInspection(int id, Inspection inspection)
        {
            var inspectionObj = InspectioneDb.Inspections.FirstOrDefault(inspec => inspec.Id == id);
            inspectionObj.Score = inspection.Score;

            InspectioneDb.SaveChanges();
        }
    }
}