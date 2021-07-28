using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VehicleInspectionApplication.EntityDataModel;

namespace VehicleInspectionApplication.Models
{
    public class ModelMdl
    {
        private static InspectionDBEntities1 _modelDb;
        private static InspectionDBEntities1 ModelDb
        {
            get { return _modelDb ?? (_modelDb = new InspectionDBEntities1()); }
        }

        /// <summary>
        /// Gets the makes.
        /// </summary>
        /// <returns>IEnumerable Make List</returns>
        public static IEnumerable<Model> GetModels(string name)
        {
            ModelDb.Configuration.ProxyCreationEnabled = false;
            var query = from models in ModelDb.Models where models.MakeName.Equals(name) select models;
            return query.ToList();
        }
    }
}