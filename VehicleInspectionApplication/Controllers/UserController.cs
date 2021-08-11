using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataAccessLayer.EntityDataModel;
using DataAccessLayer.Models;

namespace VehicleInspectionApplication.Controllers
{
    public class UserController : ApiController
    {
        public IEnumerable<User> Get(string username, string password)
        {
            return UserModel.SignInUser(username, password);
        }
    }
}
