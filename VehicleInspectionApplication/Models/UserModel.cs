﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VehicleInspectionApplication.EntityDataModel;

namespace VehicleInspectionApplication.Models
{
    public class UserModel
    {
        private static InspectionDBEntities2 _Db;
        private static InspectionDBEntities2 Db
        {
            get { return _Db ?? (_Db = new InspectionDBEntities2()); }
        }

        /// <summary>
        /// Login users.
        /// </summary>
        /// <returns>IQueryable User List</returns>
        public static IQueryable<User> SignInUser(string username, string password)
        {
            Db.Configuration.ProxyCreationEnabled = false;
            var query = from users in Db.Users where (users.Name == username && users.Password == password) select users;
            return query;
        }
    }
}