using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace _MyBlindTouch.Models
{
    public class QuizStrModel
    {
        public int Id { get; set; }
        public string? Level { get; set; }
        public string? QuizStr { get; set; }//出題する文字列

    }
}
