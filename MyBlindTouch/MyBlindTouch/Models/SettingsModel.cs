using Microsoft.AspNetCore.Mvc;

namespace MyBlindTouch.Models
{
    public class SettingsModel
    {
        public int SoundVolume { get; set; }
        public string? SoundOnOff { get; set; }
        public int GameTime { get; set; }
        public int QuestionTime { get; set; }
    }
}
