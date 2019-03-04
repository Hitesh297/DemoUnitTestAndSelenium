using System;
using BuildTrackerAPI.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTestProject1
{
    [TestClass]
    public class BuildTrackerAPITest
    {
        [TestMethod]
        public void TestMethod1()
        {
            DeploymentController deploymentController = new DeploymentController();
            string result = deploymentController.Get(12);
            Assert.AreEqual("value", result);
        }
    }
}
