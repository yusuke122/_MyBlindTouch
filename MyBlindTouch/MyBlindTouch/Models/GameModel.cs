using System.ComponentModel.DataAnnotations.Schema;

namespace MyBlindTouch.Models
{
    public class GameModel
    {
        public List<string>? LevelList { get; set; } = new List<string>();
        public List<string> LevelListName { get; set; } = new List<string> { "初級", "中級", "上級" };
        public List<string>? QuizStrCopy { get; set; } = new List<string>();//QuizModelのQuizStrを格納する
        public bool Level { get; set; }
        public bool ElementLevel { get; set; }
        public bool MiddleLevel { get; set; }
        public bool TopLevel { get; set; }

    }
}
