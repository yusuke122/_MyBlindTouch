#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using _MyBlindTouch.Models;

namespace _MyBlindTouch.Data
{
    public class _MyBlindTouchContext : DbContext
    {
        public _MyBlindTouchContext (DbContextOptions<_MyBlindTouchContext> options)
            : base(options)
        {
        }

        public DbSet<_MyBlindTouch.Models.QuizStrModel> QuizModel { get; set; }
    }
}
