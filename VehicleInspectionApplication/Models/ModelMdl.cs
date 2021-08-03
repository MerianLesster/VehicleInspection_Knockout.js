using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VehicleInspectionApplication.EntityDataModel;

namespace VehicleInspectionApplication.Models
{
    public class ModelMdl
    {
        private static InspectionDBEntities2 _modelDb;
        private static InspectionDBEntities2 ModelDb
        {
            get { return _modelDb ?? (_modelDb = new InspectionDBEntities2()); }
        }

        /// <summary>
        /// Gets the makes.
        /// </summary>
        /// <returns>IEnumerable Make List</returns>
        public static IQueryable<Model> GetModels(int makeId)
        {
            ModelDb.Configuration.ProxyCreationEnabled = false;
            var query = from models in ModelDb.Models where(models.Make_Id == makeId) select models;
            return query;
        }
    }
}