using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chess.Models;

namespace Chess.Data
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly AppDbContext _context;

        public FeedbackRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task Add(Feedback feedback)
        {
            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();
        }
    }
}
