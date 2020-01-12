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
            return await _context.Pgns.FirstOrDefaultAsync(g => g.Id == id);
        }
    }
}
