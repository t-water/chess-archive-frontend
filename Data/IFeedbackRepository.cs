using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chess.Models;

namespace Chess.Data
{
    public interface IFeedbackRepository
    {
        Task Add(Feedback feedback);
    }
}
