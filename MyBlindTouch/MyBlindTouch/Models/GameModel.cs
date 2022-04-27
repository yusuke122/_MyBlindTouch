using System.ComponentModel.DataAnnotations.Schema;

namespace MyBlindTouch.Models
{
    public class GameModel
    {
        public List<bool>? LevelList { get; set; } = new List<bool> { true,false,false};//チェックボックスで選択したレベルを格納する
        public List<string>? QuizStrCopy { get; set; } = new List<string>();//QuizModelのQuizStrを格納する
        public List<string>? LevelCopy { get; set; } = new List<string>();//QuizModelのLevelを格納する
        public List<string>? QuizStrOutputList { get; set; } = new List<string>();//ゲームで表示する問題の文字列を格納する
    }



}
