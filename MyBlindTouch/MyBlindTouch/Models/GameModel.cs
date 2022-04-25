using System.ComponentModel.DataAnnotations.Schema;

namespace MyBlindTouch.Models
{
    public class GameModel
    {
        
        public List<string>? QuizStrCopy { get; set; } = new List<string>();//QuizModelのQuizStrを格納する
        public bool ElementLevel { get; set; }
        public bool MiddleLevel { get; set; }
        public bool TopLevel { get; set; }

    }
}
