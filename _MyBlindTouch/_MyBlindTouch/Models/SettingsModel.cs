using Microsoft.AspNetCore.Mvc;

namespace _MyBlindTouch.Models
{
    public class SettingsModel
    {
        public int SoundVolume { get; set; } = 50;
        public string? SoundOnOff { get; set; } = "soundoff";
        public int GameTime { get; set; } = 30;
        public int QuestionTime { get; set; } = 5;
    }
}
