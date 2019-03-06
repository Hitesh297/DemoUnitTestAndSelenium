using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BuildTrackerAPI.Models
{
    public class BuildInfo
    {
        public string CommitVersion { get; set; }
        public string Comments { get; set; }
        public string Server { get; set; }
        public string DeployedOn { get; set; }
        public string StoriesIncluded { get; set; }
    }
}