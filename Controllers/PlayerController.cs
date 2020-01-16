﻿using System;
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
        public async Task<IActionResult> GetPlayers(string name)
        {
            var model = await playerRepo.GetPlayersFiltered(name);
            string jsonResponse = JsonConvert.SerializeObject(model);
            return Content(jsonResponse, "application/json");
        }

        [HttpGet]
        [Route("GetPlayer")]
        public async Task<IActionResult> GetPlayer(int id)
        {
            var model = await playerRepo.GetPlayer(id);
            string jsonResponse = JsonConvert.SerializeObject(model);
            return Content(jsonResponse, "application/json");
        }

        [HttpGet]
        [Route("ViewGames")]
        public async Task<IActionResult> ViewGames(int id)
        {
            var model = await playerRepo.ViewGames(id);
            string jsonResponse = JsonConvert.SerializeObject(model);
            return Content(jsonResponse, "application/json");
        }

        [HttpGet]
        [Route("GetFeaturedPlayers")]
        public async Task<IActionResult> GetFeaturedPlayers(){
            var model = await playerRepo.GetFeaturedPlayers();
            string jsonResponse = JsonConvert.SerializeObject(model);
            return Content(jsonResponse, "application/json");
        }
    }
}