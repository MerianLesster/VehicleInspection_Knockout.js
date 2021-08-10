using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VehicleInspectionApplication.EntityDataModel;

namespace VehicleInspectionApplication.Models
{
    public class VehicleModel
    {
        private static InspectionDBEntities2Entities _vehicleDb;
        private static InspectionDBEntities2Entities VehicleDb
        {
            get { return _vehicleDb ?? (_vehicleDb = new InspectionDBEntities2Entities()); }
        }

        /// <summary>
        /// Gets the vehicles.
        /// </summary>
        /// <returns>IEnumerable Vehicle List</returns>
        public static IEnumerable<Vehicle> GetVehicles()
        {
            var query = from vehicles in VehicleDb.Vehicles select vehicles;
            return query.ToList();
        }

        /// <summary>
        /// Inserts the vehicle to database.
        /// </summary>
        /// <param name="vehicle">The vehicle object to insert.</param>
        public static void InsertVehicle(Vehicle vehicle)
        {
            VehicleDb.Vehicles.Add(vehicle);
            VehicleDb.SaveChanges();
        }

        /// <summary>
        /// Deletes vehicle from database.
        /// </summary>
        /// <param name="vehicleId">Vehicle ID</param>
        public static void DeleteVehicle(int vehicleId)
        {
            var deleteItem = VehicleDb.Vehicles.FirstOrDefault(c => c.Id == vehicleId);

            if (deleteItem != null)
            {
                VehicleDb.Vehicles.Remove(deleteItem);
                VehicleDb.SaveChanges();
            }
        }
    }
}