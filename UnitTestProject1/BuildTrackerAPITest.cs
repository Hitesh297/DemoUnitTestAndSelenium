using System;
using System.Net.Http;
using BuildTrackerAPI.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTestProject1
{
    [TestClass]
    public class BuildTrackerAPITest
    {
        DeploymentController deploymentController = new DeploymentController();
        

        [TestCategory("A-1234")]
        [TestMethod]
        public void BuildTrackerTest1()
        {
            
            string result = deploymentController.Get(12);
            Assert.AreEqual("value", result);
        }

        [TestCategory("A-1234")]
        [TestMethod]
        public void FailThisTestTest1()
        {

            string result = deploymentController.Get(12);
            Assert.AreEqual("valu", result);
        }

        [TestCategory("B-1234")]
        [TestMethod]
        public void BuildTrackerTest2()
        {

            deploymentController.Put(12,"string");
        }

        [TestCategory("C-1234")]
        [TestMethod]
        public void GetPreviousBuildCommitTest()
        {
            deploymentController.Request = new System.Net.Http.HttpRequestMessage();
            deploymentController.Configuration = new System.Web.Http.HttpConfiguration();
            HttpResponseMessage result = deploymentController.GetPreviousDeployCommit();
            string commit;
            result.TryGetContentValue(out commit);
            Assert.IsNotNull(commit);
        }


    }
}
