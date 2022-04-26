using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace MyBlindTouch.Models
{
    public class QuizModel
    {
        public int Id { get; set; }
        public string? Level { get; set; }
        public string? QuizStr { get; set; }//出題する文字列
    }
}
