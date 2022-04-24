﻿#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using MyBlindTouch.Data;
using MyBlindTouch.Models;

namespace MyBlindTouch.Controllers
{
    [Route("Game")]

    public class GameController : Controller
    {
        private readonly MyBlindTouchContext _copycontext;
        public GameController(MyBlindTouchContext copycontext)
        {
            _copycontext= copycontext;
        }
        [Route("Index")]
        //非同期メソッド
        public async Task<IActionResult> Index()
        {
            GameModel model = new GameModel();
            var alldata = await _copycontext.QuizModel.ToListAsync();//全データ読み込み
            var getdata = await _copycontext.QuizModel.Where(x => x.Id >= 0).ToListAsync();//LINQで特定のデータを読み込み
            foreach (var item in getdata)
            {
                model.QuizStrCopy.Add(item.QuizStr);
            }
            return View(model);
        }
        [Route("Index2")]
        public IActionResult Index2()
        {
            ViewBag.gamesound = HttpContext.Session.GetInt32("gametime");//データ変更 ログイン画面は変更、遷移先は取得
            ViewBag.gamesound = HttpContext.Session.GetInt32("questiontime");//データ変更 ログイン画面は変更、遷移先は取得
            ViewBag.gamesound = HttpContext.Session.GetInt32("gamesound");//データ変更 ログイン画面は変更、遷移先は取得
            ViewBag.soundonoff = HttpContext.Session.GetString("soundonoff");//データ変更 ログイン画面は変更、遷移先は取得
            return View("Index2");
        }
    }
}
