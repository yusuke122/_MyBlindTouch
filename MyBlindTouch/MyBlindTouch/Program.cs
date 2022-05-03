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

//session���g�����ߋL�q
//Microsoft.AspNetCore.Session�p�b�P�[�W���Z�b�V������Ԃ��Ǘ����邽�߂̃~�h���E�F�A���
//�~�h���E�F�A�𗘗p���邽�߂Ɉȉ���s���K�v
//�r���h�̑O�ɋL�q���Ȃ��ƃG���[
builder.Services.AddDistributedMemoryCache();//�o�b�N�A�b�v�f�[�^�̐ݒ�
//builder.Services.AddSession();//�Z�b�V�����@�\�̒ǉ�

builder.Services.AddSession(options =>//�Z�b�V�����@�\�̒ǉ�
{
    options.IdleTimeout = TimeSpan.FromSeconds(10);//Idle��Ԃ̎���
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

//�Z�b�V�������g��
app.UseSession();


app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
