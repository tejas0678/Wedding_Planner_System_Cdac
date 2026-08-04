using Scalar.AspNetCore;
using WeddingPlanner.DotNet.Services;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://localhost:5000");

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddSingleton<CloudinaryImageService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.MapOpenApi();
app.MapScalarApiReference();

Console.WriteLine(">>> [ASP.NET CORE BACKEND] Running on http://localhost:5000");
app.Run();
