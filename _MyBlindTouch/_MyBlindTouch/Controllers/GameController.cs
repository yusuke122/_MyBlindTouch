#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using _MyBlindTouch.Data;
using _MyBlindTouch.Models;

namespace _MyBlindTouch.Controllers
{
    [Route("Game")]

    public class GameController : Controller
    {
        private readonly _MyBlindTouchContext _copycontext;
        public GameController(_MyBlindTouchContext context)
        {
            _copycontext= context;
        }
        //非同期メソッド
        public async Task<IActionResult> Index()
        {
            
            GameModel model = new GameModel();
            return View(model);//modelごと送って送り先でプロパティから参照
        }
        
        [HttpPost]
        public async Task<IActionResult> Game(GameModel model)
        {
            ViewBag.gametime = HttpContext.Session.GetInt32("gametime");//データ変更 ログイン画面は変更、遷移先は取得
            ViewBag.questiontime = HttpContext.Session.GetInt32("questiontime");//データ変更 ログイン画面は変更、遷移先は取得
            ViewBag.gamesound = HttpContext.Session.GetInt32("gamesound");//データ変更 ログイン画面は変更、遷移先は取得
            ViewBag.soundonoff = HttpContext.Session.GetString("soundonoff");//データ変更 ログイン画面は変更、遷移先は取得
            
            var alldata = await _copycontext.QuizModel.ToListAsync();//全データ読み込み
           //var getdata = await _copycontext.QuizModel.Where(x => x.Id >= 0).ToListAsync();//LINQで特定のデータを読み込み
           // QuizStrCopyClass quizstrcopyclass=new QuizStrCopyClass();
            foreach (var item in alldata)
            {
                model.QuizStrCopy.Add(item.QuizStr);
                model.LevelCopy.Add(item.Level);
                model.IdCopy.Add(item.Id);
            }

            return View(model);//modelごと送って送り先でプロパティから参照
        }
    }
}
