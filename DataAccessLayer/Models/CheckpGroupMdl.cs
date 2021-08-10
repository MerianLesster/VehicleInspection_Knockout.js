using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DataAccessLayer.EntityDataModel;
namespace DataAccessLayer.Models
{
    public class CheckpGroupMdl
    {
        private static InspectionDBEntities2Entities _Db;
        private static InspectionDBEntities2Entities Db
        {
            get { return _Db ?? (_Db = new InspectionDBEntities2Entities()); }
        }

        /// <summary>
        /// Gets the makes.
        /// </summary>
        /// <returns>IEnumerable Checkpoint Group List</returns>
        public static IEnumerable<CheckpointGroup> GetCheckpGroups()
        {
            Db.Configuration.ProxyCreationEnabled = false;
            var query = from groups in Db.CheckpointGroups select groups;
            return query.ToList();
        }
    }
}