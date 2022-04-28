using System.ComponentModel.DataAnnotations.Schema;

namespace MyBlindTouch.Models
{
    public class GameModel
    {
        public List<bool>? LevelList { get; set; } = new List<bool> { true,false,false};//チェックボックスで選択したレベルを格納する
        public List<string>? QuizStrCopy { get; set; } = new List<string>();//QuizModelのQuizStrを格納する
        public List<string>? LevelCopy { get; set; } = new List<string>();//QuizModelのLevelを格納する
        public List<string>? QuizStrOutputList { get; set; } = new List<string>();//ゲームで表示する問題の文字列を格納する
        public List<int>? IdCopy { get; set; } = new List<int>();
        public int GameTime { get; set; } = 30;//ゲーム全体の時間
        public int QuestionTime { get; set; } = 5;//解答時間
        public string GameSound { get; set; } = "soundoff";//音の出力の有無
        public int SoundVolume { get; set; } = 50;//音量
    }



}
