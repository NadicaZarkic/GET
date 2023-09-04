using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication;
using AutoMapper;

namespace API.Controllers
{
    public class AccountController:BaseApiController
    {

         private readonly GetContext _context;
        private readonly ITokenService _tokenService;

        private readonly UserManager<AspNetUser> _userManager;
      
        private readonly SignInManager<AspNetUser> _signInManager;
        public IMapper _mapper { get; }

         private readonly string _pepper;
        private readonly int _iteration = 3;
        public AccountController(UserManager<AspNetUser> userManager,SignInManager<AspNetUser> signInManager,GetContext context, ITokenService tokenService,IMapper mapper)
        {

            _context = context;
             _userManager = userManager;
            _tokenService = tokenService;
             _signInManager = signInManager;
            _mapper = mapper;
             _pepper = Environment.GetEnvironmentVariable("PasswordHashExamplePepper");
            
        }

        //    public static string ComputeHash(string password, string salt, string pepper, int iteration)
        //         {
        //             if (iteration <= 0) return password;
                    
        //             using var sha256 = SHA256.Create();
        //             var passwordSaltPepper = $"{password}{salt}{pepper}";
        //             var byteValue = Encoding.UTF8.GetBytes(passwordSaltPepper);
        //             var byteHash = sha256.ComputeHash(byteValue);
        //             var hash = Convert.ToBase64String(byteHash);
        //             return ComputeHash(hash, salt, pepper, iteration - 1);
        //         }


        //          public static string GenerateSalt()
        //     {
        //         using var rng = RandomNumberGenerator.Create();
        //         var byteSalt = new byte[16];
        //         rng.GetBytes(byteSalt);
        //         var salt = Convert.ToBase64String(byteSalt);
        //         return salt;
        //     }


        [HttpPost("register")] // POST: api/account/register?username=aa&password=aa
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

             if (await UserExists(registerDto.Username)) 
            {
                return BadRequest("Username is taken");
            }

            var user =  _mapper.Map<AspNetUser>(registerDto);

           user.UserName = registerDto.Username.ToLower();
               
          

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if(!result.Succeeded) return BadRequest(result.Errors);


            if(Convert.ToInt32(registerDto.RoleId)==3)
            {
            var roleResult = await _userManager.AddToRoleAsync(user,"Admin");
              if(!roleResult.Succeeded) return BadRequest(result.Errors);
            }
            else if(Convert.ToInt32(registerDto.RoleId)==2)
            {
                 var roleResult = await _userManager.AddToRoleAsync(user,"Agent");
                   if(!roleResult.Succeeded) return BadRequest(result.Errors);
            }
            else
            {
              var roleResult = await _userManager.AddToRoleAsync(user,"Viewer");
                if(!roleResult.Succeeded) return BadRequest(result.Errors);
            }
    
          

            
            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                UserId = user.Id
               
            };
        }


         [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
              var user = await _userManager.Users
            .SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if(user == null) return Unauthorized("Invalid username");

            var result = await _signInManager
            .CheckPasswordSignInAsync(user,loginDto.Password,false);

            if(!result.Succeeded) return Unauthorized();

            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                UserId = user.Id
             
            };

        }

         private async Task<bool> UserExists(string username)
        {
            return await _context.AspNetUsers.AnyAsync(x => x.UserName == username.ToLower());
        }

        
    }
}