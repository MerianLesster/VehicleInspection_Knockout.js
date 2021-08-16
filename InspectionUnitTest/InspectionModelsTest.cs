using DataAccessLayer.EntityDataModel;
using DataAccessLayer.Models;
using FakeItEasy;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Web.Http;
using VehicleInspectionApplication.Controllers;

namespace InspectionUnitTest
{
    [TestClass]
    public class InspectionModelsTest
    {
        [TestMethod]
        public void GetMakes_Returns_All_Makes()
        {
            // arrange
            var fakeContext = A.Fake<InspectionDBEntities2Entities>();

            // act
            var fakeMakeDbSet = A.Fake<DbSet<Make>>();

            // assert
            A.CallTo(() => fakeContext.Makes).Returns(fakeMakeDbSet);
        }

        [TestMethod]
        public void GetModels_Returns_All_Models()
        {
            // arrange
            var fakeContext = A.Fake<InspectionDBEntities2Entities>();

            // act
            var fakeModelDbSet = A.Fake<DbSet<Model>>();

            // assert
            A.CallTo(() => fakeContext.Models).Returns(fakeModelDbSet);
        }

    }
}
