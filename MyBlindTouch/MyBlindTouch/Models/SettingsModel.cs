using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace MyBlindTouch.Models
{
    public class SettingsModel
    {
        public int SoundVolume { get; set; }
        public string? SoundOnOff { get; set; } = "soundoff";
        public int GameTime { get; set; }
        public int QuestionTime { get; set; }
    }
}
