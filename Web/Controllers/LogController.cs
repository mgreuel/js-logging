using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Web.Controllers
{
    public class LogController : ApiController
    {
        public void Post([FromBody]LogEntry logEntry)
        {
            // todo: log the entry
        }

        public class LogEntry
        {
            public string Message { get; set; }

            public string LogLevel { get; set; }

            public string Category { get; set; }
        }
    }
}
