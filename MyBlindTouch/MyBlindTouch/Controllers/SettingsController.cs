using Microsoft.AspNetCore.Mvc;

namespace MyBlindTouch.Controllers
{
    [Route("Settings")]
    public class SettingsController : Controller
    {
        [Route("Index")]
        public IActionResult Index()
        {
            return View();
        }
        [Route("Other")]
        public IActionResult Other()
        {
            ViewBag.gamesound = HttpContext.Session.GetInt32("gamesound");//データ変更 ログイン画面は変更、遷移先は取得
            ViewBag.soundonoff = HttpContext.Session.GetString("soundonoff");//データ変更 ログイン画面は変更、遷移先は取得
            ViewBag.gametime = HttpContext.Session.GetInt32("gametime");//データ変更 ログイン画面は変更、遷移先は取得
            ViewBag.questiontime = HttpContext.Session.GetInt32("questiontime");//データ変更 ログイン画面は変更、遷移先は取得

            return View();
        }
        [HttpPost]//データ表示はget データ変更はpost
        [Route("SetValue")]
        public IActionResult SetValue(int gamesound, string soundonoff,int gametime,int questiontime)
        {
            HttpContext.Session.SetInt32("gamesound", gamesound);//データ変更 ログイン画面は変更、遷移先は取得
            HttpContext.Session.SetString("soundonoff", soundonoff);//データ変更 ログイン画面は変更、遷移先は取得
            HttpContext.Session.SetInt32("gametime", gametime);//データ変更 ログイン画面は変更、遷移先は取得
            HttpContext.Session.SetInt32("questiontime", questiontime);//データ変更 ログイン画面は変更、遷移先は取得

            ViewBag.gamesound = HttpContext.Session.GetInt32("gamesound");//データ変更 ログイン画面は変更、遷移先は取得
            ViewBag.soundonoff = HttpContext.Session.GetString("soundonoff");//データ変更 ログイン画面は変更、遷移先は取得
            ViewBag.gametime = HttpContext.Session.GetInt32("gametime");//データ変更 ログイン画面は変更、遷移先は取得
            ViewBag.questiontime = HttpContext.Session.GetInt32("questiontime");//データ変更 ログイン画面は変更、遷移先は取得
            return View("Index");
        }
        [Route("CheckValue")]
        public IActionResult CheckValue()
        {
            ViewBag.gamesound = HttpContext.Session.GetInt32("gamesound");//データ変更 ログイン画面は変更、遷移先は取得
            ViewBag.soundonoff = HttpContext.Session.GetString("soundonoff");//データ変更 ログイン画面は変更、遷移先は取得
            ViewBag.gametime = HttpContext.Session.GetInt32("gametime");//データ変更 ログイン画面は変更、遷移先は取得
            ViewBag.questiontime = HttpContext.Session.GetInt32("questiontime");//データ変更 ログイン画面は変更、遷移先は取得

            return View("CheckValue");
        }

    }
}
