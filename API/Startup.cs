using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using API.Services;
using API.Interfaces;
using API.Controllers;
using Microsoft.EntityFrameworkCore;
using API.Middleware;
using API.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using API.Controllers.Data;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using API.SignalR;

namespace API
{
    public class Startup
    {
           private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
           _config = config;
        }
       


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
      //      services.AddApplicationServices(_config);
         services.AddDbContext<GetContext>(opt =>
            {
                opt.UseSqlServer(_config.GetConnectionString("DefaultConnection"));
            }); 

            services.AddControllers();
           services.AddCors();
           services.AddAuthorization();
           services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
           services.AddScoped<IFlightRepository, FlightRepository>();
           services.AddScoped<IReservationRepository, ReservationRepository>();
            services.AddScoped<ITokenService,TokenService>();
            services.AddSignalR();
            services.AddSingleton<PresenceTracker>();  

                services.AddIdentityCore<AspNetUser>(o =>
                            {
                               
                                o.Password.RequireDigit = false;
                                o.Password.RequireLowercase = false;
                                o.Password.RequireUppercase = false;
                                o.Password.RequireNonAlphanumeric = false;
                                o.Password.RequiredLength = 4;
                            
                            })
                            .AddRoles<AspNetRole>()
                            .AddRoleManager<RoleManager<AspNetRole>>()
                            .AddSignInManager<SignInManager<AspNetUser>>()
                            .AddRoleValidator<RoleValidator<AspNetRole>>()
                            .AddEntityFrameworkStores<GetContext>();
    
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters 
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"])),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };

                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];

                            var path = context.HttpContext.Request.Path;

                            if(!String.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs"))
                            {
                                context.Token = accessToken;
                            }

                            return Task.CompletedTask;
                        }
                    };
                  
                });  


                
            services.AddScoped<ITokenService, TokenService>();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseMiddleware<ExceptionMiddleware>();
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

             app.UseCors(x => x.AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .WithOrigins("https://localhost:4200"));


            app.UseAuthentication();
            app.UseAuthorization();

            

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<PresenceHub>("hubs/presence");
                endpoints.MapHub<ReservationHub>("hubs/reservation");
            });
        }
    }
}
