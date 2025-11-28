using backend.Services.implementations;
using PythonEditor.Models;
using PythonEditor.Services.implementations;
using PythonEditor.Services.interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSingleton<AuthServices>();
builder.Services.AddSingleton<CodeSaveService>();
builder.Services.Configure<DockerSettings>(
    builder.Configuration.GetSection("DockerSettings")
);

builder.Services.AddScoped<ICodeRunner, CodeRunner>();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (!app.Environment.IsDevelopment())
//{
//    app.UseExceptionHandler("/Home/Error");
//    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
//    app.UseHsts();
//}

app.UseHttpsRedirection();
//app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.UseCors("AllowAll");

//app.MapControllerRoute(
//    name: "default",
//    pattern: "{controller=Home}/{action=Index}/{id?}");
app.MapControllers();

app.Run();