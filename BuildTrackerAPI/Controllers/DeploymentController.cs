using BuildTrackerAPI.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BuildTrackerAPI.Controllers
{
    public class DeploymentController : ApiController
    {
        private const string _FilePath = @"C:\inetpub\DeployData.json";
        // GET: api/Deployment
        public HttpResponseMessage Get()
        {

            if (!File.Exists(_FilePath))
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "File Not Found at " + _FilePath);
            }
            string initialJson = File.ReadAllText(_FilePath);
            return Request.CreateResponse(JsonConvert.DeserializeObject<List<BuildInfo>>(initialJson));

        }

        [HttpGet, Route("GetPreviousDeployCommit")]
        public HttpResponseMessage GetPreviousDeployCommit()
        {

            if (!File.Exists(_FilePath))
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "File Not Found at " + _FilePath);
            }
            string initialJson = File.ReadAllText(_FilePath);
            List<BuildInfo> buildInfos = JsonConvert.DeserializeObject<List<BuildInfo>>(initialJson);
            BuildInfo lastDeploy = buildInfos.OrderBy(x => Convert.ToDateTime(x.DeployedOn)).ToList().Last();
            return Request.CreateResponse(lastDeploy.CommitVersion);


        }

        [HttpGet, Route("GetCompare/{server1}/{server2}")]
        public HttpResponseMessage GetPreviousDeployCommit(string server1, string server2)
        {

            if (!File.Exists(_FilePath))
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "File Not Found at " + _FilePath);
            }
            string initialJson = File.ReadAllText(_FilePath);
            List<BuildInfo> buildInfos = JsonConvert.DeserializeObject<List<BuildInfo>>(initialJson);
            List<string> appList = buildInfos.Select(x => x.AppName).Distinct().ToList();
            List<BuidCompare> buidCompares = new List<BuidCompare>();
            BuildInfo server1Data = new BuildInfo();
            BuildInfo server2Data = new BuildInfo();
            foreach (var app in appList)
            {
                BuidCompare compareDetails = new BuidCompare() { AppName=app };
                server1Data = buildInfos.Where(x => x.AppName == app && x.Server == server1).OrderBy(x => Convert.ToDateTime(x.DeployedOn)).LastOrDefault();
                server2Data = buildInfos.Where(x => x.AppName == app && x.Server == server2).OrderBy(x => Convert.ToDateTime(x.DeployedOn)).LastOrDefault();
                compareDetails.Server1Commit = server1Data.CommitVersion;
                compareDetails.Server1Name = server1Data.Server;
                compareDetails.Server1DeployDate = server1Data.DeployedOn;
                compareDetails.Server2Commit = server2Data.CommitVersion;
                compareDetails.Server2Name = server2Data.Server;
                compareDetails.Server2DeployDate = server2Data.DeployedOn;
                buidCompares.Add(compareDetails);
            }
            
            return Request.CreateResponse(buidCompares);


        }

        // GET: api/Deployment/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Deployment
        public HttpResponseMessage Post([FromBody]BuildInfo value)
        {
            List<BuildInfo> buildDetails = new List<BuildInfo>();
            if (!File.Exists(_FilePath))
            {
                File.CreateText(_FilePath);
            }
            string initialJson = File.ReadAllText(_FilePath);
            if (!string.IsNullOrWhiteSpace(initialJson))
            {
                buildDetails = JsonConvert.DeserializeObject<List<BuildInfo>>(initialJson);
            }
            value.DeployedOn = DateTime.Now.ToString();
            setPriorDeployDetails(value);
            buildDetails.Add(value);
            string jsonData = JsonConvert.SerializeObject(buildDetails);
            File.WriteAllText(_FilePath, jsonData);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        private void setPriorDeployDetails(BuildInfo value)
        {
            string initialJson = File.ReadAllText(_FilePath);
            List<BuildInfo> buildInfos = JsonConvert.DeserializeObject<List<BuildInfo>>(initialJson);
            BuildInfo priorDeploy = new BuildInfo();
            if (buildInfos != null)
            {
                priorDeploy = buildInfos.Where(x => x.AppName == value.AppName && x.Server == x.Server).OrderBy(x => Convert.ToDateTime(x.DeployedOn)).ToList().LastOrDefault();
            }
            if (priorDeploy != null)
            {
                value.PriorCommitVersion = priorDeploy.CommitVersion;
                value.PriorDeployDate = priorDeploy.DeployedOn;
            }
        }


        // PUT: api/Deployment/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Deployment/5
        public void Delete(int id)
        {
        }

    }
}
