using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VehicleInspectionApplication.EntityDataModel;

namespace VehicleInspectionApplication.Models
{
    public class InspectionMdl
    {
        private static InspectionDBEntities2 _inspectionDb;
        private static InspectionDBEntities2 InspectioneDb
        {
            get { return _inspectionDb ?? (_inspectionDb = new InspectionDBEntities2()); }
        }

        /// <summary>
        /// Inserts new Inspection to table.
        /// </summary>
        /// <param name="inspection">The inspection object to insert.</param>
        public static void CreateInspection(Inspection inspection)
        {
            InspectioneDb.Inspections.Add(inspection);
            InspectioneDb.SaveChanges();
        }
    }
}