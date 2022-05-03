using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MyBlindTouch.Data;
using Azure.Identity;
var builder = WebApplication.CreateBuilder(args);

var keyVaultEndpoint = new Uri(Environment.GetEnvironmentVariable("VaultUri"));
builder.Configuration.AddAzureKeyVault(keyVaultEndpoint, new DefaultAzureCredential());

builder.Configuration.AddAzureKeyVault(keyVaultEndpoint, new DefaultAzureCredential());

builder.Services.AddDbContext<MyBlindTouchContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MyBlindTouchContext") ?? throw new InvalidOperationException("Connection string 'MyBlindTouchContext' not found.")));

// Add services to the container.
builder.Services.AddControllersWithViews();

//sessionを使うため記述
//Microsoft.AspNetCore.Sessionパッケージ＝セッション状態を管理するためのミドルウェアを提供
//ミドルウェアを利用するために以下二行が必要
//ビルドの前に記述しないとエラー
builder.Services.AddDistributedMemoryCache();//バックアップデータの設定
//builder.Services.AddSession();//セッション機能の追加

builder.Services.AddSession(options =>//セッション機能の追加
{
    options.IdleTimeout = TimeSpan.FromSeconds(10);//Idle状態の時間
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

//セッションを使う
app.UseSession();


app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
