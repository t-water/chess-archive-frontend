using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chess.Models;

namespace Chess.Data
{
    public interface IPlayerRepository
    {
        public Task Add(Player player);
        public Task<IEnumerable<Player>> GetPlayers();
        public IQueryable<Player> GetPlayersFiltered(string name);
        public Task<Player> GetPlayer(int id);
        public Task<PlayerGames> ViewGames(int id);
        public Task<IEnumerable<Player>> GetFeaturedPlayers();
    }
}
