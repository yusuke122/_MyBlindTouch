#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyBlindTouch.Models;

namespace MyBlindTouch.Data
{
    public class MyBlindTouchContext : DbContext
    {
        public MyBlindTouchContext (DbContextOptions<MyBlindTouchContext> options)
            : base(options)
        {
        }

        public DbSet<MyBlindTouch.Models.QuizModel> QuizModel { get; set; }
    }
}
