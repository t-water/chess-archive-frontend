using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Chess.Models;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Chess.Data;

namespace Chess.Controllers
{
    [Route("[controller]")]
    public class PgnController : Controller
    {
        private readonly IPgnRepository pgnRepo;

        public PgnController(IPgnRepository pgnRepo)
        {
            this.pgnRepo = pgnRepo;
        }

        [HttpGet]
        [Route("GetGame")]
        public async Task<IActionResult> GetGame(int id){
            var model = await pgnRepo.GetGame(id);
            string jsonResponse = JsonConvert.SerializeObject(model);
            return Content(jsonResponse, "application/json");
        }

        [HttpPost]
        [Route("UploadText")]
        public async Task<IActionResult> UploadText(PgnString text)
        {
            Pgn model;
            string jsonResponse;

            try
            {
                model = ParsePGNString(text.Pgn);
                await pgnRepo.Add(model);
                jsonResponse = JsonConvert.SerializeObject(model);
            }
            catch(Exception ex)
            {
                jsonResponse = ReturnErrorMessage(ex.Message);
            } 
            
            return Content(jsonResponse, "application/json");
        }

        [HttpPost]
        [Route("SubmitText")]
        public IActionResult SubmitText(PgnString text)
        {
            Pgn model;
            string jsonResponse;

            try
            {
                model = ParsePGNString(text.Pgn);
                jsonResponse = JsonConvert.SerializeObject(model);
            }
            catch(Exception ex)
            {
                jsonResponse = ReturnErrorMessage(ex.Message);
            } 
            
            return Content(jsonResponse, "application/json");
        }

        private Pgn ParsePGNString(string pgn)
        {
            pgn = pgn.Trim();
            string[] pgnArray = Regex.Split(pgn, @"(?<=\])\s*(?=1\.\s{0,1}[a-zA-Z])");
            string headers;
            string moves;
            Pgn model;

            if(pgnArray.Length > 2)
            {
                throw new Exception("Invalid Format");
            }
            else
            {
                if(pgnArray.Length == 1)
                {
                    moves = pgnArray[0].Trim();
                    if (!moves.StartsWith("1"))
                    {
                        throw new Exception("Invalid Format");
                    }

                    if (!moves.EndsWith("0-1") && !moves.EndsWith("1-0") && !moves.EndsWith("1/2-1/2"))
                    {
                        throw new Exception("Invalid Format");
                    }

                    model = new Pgn
                    {
                        Moves = moves
                    };
                }
                else if(pgnArray.Length == 2)
                {
                    headers = pgnArray[0];
                    moves = pgnArray[1].Trim();
                    if (!moves.StartsWith("1"))
                    {
                        throw new Exception("Invalid Format");
                    }

                    if (!moves.EndsWith("0-1") && !moves.EndsWith("1-0") && !moves.EndsWith("1/2-1/2"))
                    {
                        throw new Exception("Invalid Format");
                    }

                    if (!headers.Contains("[") && !headers.Contains("]"))
                    {
                        throw new Exception("Invalid Format");
                    }

                    model = new Pgn
                    {
                        Moves = moves
                    };

                    string[] headerArray = Regex.Split(headers, @"\s(?=\[)");
                    foreach (string h in headerArray)
                    {
                        string headerTitle = Regex.Match(h, @"(?<=\[)[a-zA-Z]+").Value;
                        var propertyName = model.GetType().GetProperty(headerTitle);
                        if (propertyName != null)
                        {
                            var headerData = h.Replace("\"", "")
                               .Replace(headerTitle, "")
                               .Replace("[", "")
                               .Replace("]", "")
                               .Trim();
                            propertyName.SetValue(model, headerData);
                        }
                    };
                }
                else
                {
                    throw new Exception("Invalid Format");
                }
            }
            model.WhitePlayerId = 1;
            model.BlackPlayerId = 1;
            
            return model;
        }
        
        private string ReturnErrorMessage(string message){
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("Error", message);
            return JsonConvert.SerializeObject(dict);
        }
    }
}