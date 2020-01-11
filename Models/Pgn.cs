using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chess.Models
{
    public class Pgn
    {
        public int Id { get; set; }
        public string Event { get; set; }
        public string Site { get; set; }
        public string Date { get; set; }
        public string Round { get; set; }
        public string Result { get; set; }
        public string Moves { get; set; }

        public int WhitePlayerId { get; set; }
        public Player WhitePlayer { get; set; }

        public int BlackPlayerId { get; set; }
        public Player BlackPlayer { get; set; }
    }
}