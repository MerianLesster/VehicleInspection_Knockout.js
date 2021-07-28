using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VehicleInspectionApplication.EntityDataModel;

namespace VehicleInspectionApplication.Models
{
    public class MakeMdl
    {
        private static InspectionDBEntities1 _makeDb;
        private static InspectionDBEntities1 MakeDb
        {
            get { return _makeDb ?? (_makeDb = new InspectionDBEntities1()); }
        }
        
        /// <summary>
        /// Gets the makes.
        /// </summary>
        /// <returns>IEnumerable Make List</returns>
        public static IEnumerable<Make> GetMakes()
        {
            MakeDb.Configuration.ProxyCreationEnabled = false;
            var query = from makes in MakeDb.Makes select makes;
            return query.ToList();
        }
    }
}