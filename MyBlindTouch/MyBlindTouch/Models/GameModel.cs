using System.ComponentModel.DataAnnotations.Schema;

namespace MyBlindTouch.Models
{
    public class GameModel
    {
        public List<string>? LevelList { get; set; } = new List<string>();
        public List<QuizStrCopyClass> QuizModelCopy { get; set; } = new List<QuizStrCopyClass>();//QuizModelをコピー    
        public List<string>? QuizStrCopy { get; set; } = new List<string>();//QuizModelのQuizStrを格納する
        public List<string>? LevelCopy { get; set; } = new List<string>();//QuizModelのLevelを格納する
        public List<int>? IdCopy { get; set; } = new List<int>();//QuizModelのIdを格納する
        public bool ElementLevel { get; set; }
        public bool MiddleLevel { get; set; }
        public bool TopLevel { get; set; }

    }

    public class QuizStrCopyClass
    {
        public List<string>? QuizStrCopy { get; set; } = new List<string>();//QuizModelのQuizStrを格納する
        public List<string>? LevelCopy { get; set; } = new List<string>();//QuizModelのLevelを格納する
        public List<int>? IdCopy { get; set; } = new List<int>();//QuizModelのIdを格納する
    }

}
