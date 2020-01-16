using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chess.Models
{
    public class Feedback
    {
        public Feedback()
        {
            DateSent = DateTime.Now;
        }
        public int Id { get; set; }
        public DateTime DateSent { get; set; }
        public string Email { get; set; }
        public string Comment { get; set; }
    }
}
