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
                return Request.CreateErrorResponse(HttpStatusCode.NotFound,"File Not Found at " + _FilePath);
            }
            string initialJson = File.ReadAllText(_FilePath);
            return Request.CreateResponse(JsonConvert.DeserializeObject<List<BuildInfo>>(initialJson));
            
        }

        [HttpGet,Route("GetPreviousDeployCommit")]
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
            if (!string.IsNullOrWhiteSpace(initialJson)) {
                buildDetails = JsonConvert.DeserializeObject<List<BuildInfo>>(initialJson);
            }
            value.DeployedOn = DateTime.Now.ToString();
            buildDetails.Add(value);
            string jsonData = JsonConvert.SerializeObject(buildDetails);
            File.WriteAllText(_FilePath, jsonData);
            return Request.CreateResponse(HttpStatusCode.OK);
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
