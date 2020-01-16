using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Chess.Models;
using Chess.Data;
using Newtonsoft.Json;

namespace Chess.Controllers
{
    [Route("[controller]")]
    public class FeedbackController : Controller
    {
        private readonly IFeedbackRepository feedbackRepo;

        public FeedbackController(IFeedbackRepository feedbackRepo)
        {
            this.feedbackRepo = feedbackRepo;
        }

        [Route("add")]
        [HttpPost]
        public async Task<IActionResult> Add(Feedback feedback)
        {
            string jsonResponse;
            try
            {
                await feedbackRepo.Add(feedback);
                jsonResponse = JsonConvert.SerializeObject(feedback);
            }
            catch(Exception ex)
            {
                Dictionary<string, string> dict = new Dictionary<string, string>
                {
                    { "Error", ex.Message }
                };
                jsonResponse = JsonConvert.SerializeObject(dict);
            }

            return Content(jsonResponse, "application/json");
        }
    }
}