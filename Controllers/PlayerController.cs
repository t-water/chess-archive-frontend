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
    public class PlayerController : Controller
    {
        private readonly IPlayerRepository playerRepo;

        public PlayerController(IPlayerRepository playerRepo)
        {
            this.playerRepo = playerRepo;
        }

        [HttpGet]
        [Route("AddPlayer")]
        public IActionResult AddPlayer()
        {
            var model = new Player();
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Route("AddPlayer")]
        public async Task<IActionResult> AddPlayer(Player player)
        {
            await playerRepo.Add(player);
            var model = new Player();
            return View(model);
        }

        [HttpGet]
        [Route("GetPlayers")]
        public async Task<IActionResult> GetPlayers()
        {
            var model = await playerRepo.GetPlayers();
            string jsonResponse = JsonConvert.SerializeObject(model);
            return Content(jsonResponse, "application/json");
        }
    }
}