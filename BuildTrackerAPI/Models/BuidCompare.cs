using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BuildTrackerAPI.Models
{
    public class BuidCompare
    {
        public string AppName { get; set; }
        public string Server1Name { get; set; }
        public string Server1Commit { get; set; }
        public string Server1DeployDate { get; set; }
        public string Server2Name { get; set; }
        public string Server2Commit { get; set; }
        public string Server2DeployDate { get; set; }
    }
}