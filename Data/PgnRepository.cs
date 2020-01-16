using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chess.Models;
using Microsoft.EntityFrameworkCore;

namespace Chess.Data
{
    public class PgnRepository : IPgnRepository
    {
        private readonly AppDbContext _context;

        public PgnRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task Add(Pgn pgn){
            _context.Pgns.Add(pgn);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Pgn pgn){
        	_context.Pgns.Update(pgn);
        	await _context.SaveChangesAsync();
        }

        public async Task Delete(Pgn pgn){
        	_context.Pgns.Remove(pgn);
        	await _context.SaveChangesAsync();
        }

        public async Task<Pgn> GetGame(int id){
            return  await _context.Pgns.Where(g => g.Id == id).Include(g => g.WhitePlayer).Include(g => g.BlackPlayer).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Pgn>> GetGames()
        {
            return await _context.Pgns.ToListAsync();
        }

        public async Task<IEnumerable<Pgn>> GetGamesFiltered(string eventName)
        {
            if (!string.IsNullOrEmpty(eventName))
            {
                return await _context.Pgns.Where(p => p.Event.StartsWith(eventName) || p.Event.EndsWith(eventName)).ToListAsync();
            }

            return await _context.Pgns.ToListAsync();
        }

        public async Task<IEnumerable<Pgn>> GetFeaturedGames(){
            return await _context.Pgns.Where(g => g.Featured).ToListAsync();
        }
    }
}
