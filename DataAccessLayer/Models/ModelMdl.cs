using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DataAccessLayer.EntityDataModel;

namespace DataAccessLayer.Models
{
    public class ModelMdl
    {
        private static InspectionDBEntities2Entities _modelDb;
        private static InspectionDBEntities2Entities ModelDb
        {
            get { return _modelDb ?? (_modelDb = new InspectionDBEntities2Entities()); }
        }

        /// <summary>
        /// Gets the models.
        /// </summary>
        /// <returns>IEnumerable Model List</returns>
        public static IQueryable<Model> GetModels(int makeId)
        {
            ModelDb.Configuration.ProxyCreationEnabled = false;
            var query = from models in ModelDb.Models where(models.Make_Id == makeId) select models;
            return query;
        }
    }
}