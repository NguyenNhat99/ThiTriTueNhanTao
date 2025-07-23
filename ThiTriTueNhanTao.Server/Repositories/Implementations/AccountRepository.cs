using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ThiTriTueNhanTao.Server.Data;
using ThiTriTueNhanTao.Server.Helpers;
using ThiTriTueNhanTao.Server.Model;
using ThiTriTueNhanTao.Server.Repositories.Interface;

namespace ThiTriTueNhanTao.Server.Repositories.Implementations
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IConfiguration configuration;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly EmployeeDbContext _context;
        private readonly IMapper mapper;
        ImageHelper _ImageHelper;

        public AccountRepository(EmployeeDbContext context, UserManager<User> userManager, SignInManager<User> signInManager,
          IConfiguration configuration, RoleManager<IdentityRole> roleManager, IHttpContextAccessor httpContextAccessor, IMapper mapper, ImageHelper ImageHelper)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this.roleManager = roleManager;
            this.httpContextAccessor = httpContextAccessor;
            this._context = context;
            this.mapper = mapper;
            _ImageHelper = ImageHelper;
        }

        public Task<List<AccountModel>> DetailAccount(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<AccountModel>> GetAccounts()
        {
            var currentUser = await GetCurrentUser(); 
            if (currentUser == null) return new List<AccountModel>();

            var users = userManager.Users
                .Where(u => u.Email != currentUser.Email)
                .ToList();

            var accountModels = new List<AccountModel>();
            foreach (var user in users)
            {
                var accountModel = mapper.Map<AccountModel>(user);
                accountModel.Role = (await userManager.GetRolesAsync(user)).FirstOrDefault() ?? "";
                accountModels.Add(accountModel);
            }

            return accountModels;
        }


        public async Task<AccountModel> GetCurrentUser()
        {
            var userClaim = httpContextAccessor.HttpContext?.User;

            if (userClaim?.Identity?.IsAuthenticated != true) return null; // chưa đăng nhập

            var email = userClaim.Claims.FirstOrDefault(e => e.Type == ClaimTypes.Email)?.Value; // lấy email từ
            if (String.IsNullOrEmpty(email)) return null;

            var user = await userManager.FindByEmailAsync(email);
            if (user == null) return null;

            var accoutModel = mapper.Map<AccountModel>(user);
            accoutModel.Role = (await userManager.GetRolesAsync(user)).First();

            return accoutModel;
        }

        public async Task<string> SignInAsync(SignInModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            var passwordValid = await userManager.CheckPasswordAsync(user, model.Password);
            if (user == null || !passwordValid)
            {
                return string.Empty;
            }
            var authClaim = new List<Claim>
            {
                new Claim(ClaimTypes.Email, model.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var userRoles = await userManager.GetRolesAsync(user);
            foreach (var role in userRoles)
            {
                authClaim.Add(new Claim(ClaimTypes.Role, role.ToString()));
            }
            var authenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: configuration["JWT:ValidIssuer"],
                audience: configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddMinutes(20),
                claims: authClaim,
                signingCredentials: new SigningCredentials(authenKey, SecurityAlgorithms.HmacSha512Signature)
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<IdentityResult> SignUpAsync(SignUpModel model)
        {
            var user = new User
            {
                HoTen = model.HoTen,
                Email = model.Email,
                GioiTinh = model.GioiTinh,
                PhoneNumber = model.SoDt,
                UserName = model.Email,
                SoNha = model.SoNha,
                Xa = model.Xa,
                Huyen = model.Huyen,
                Tinh = model.Tinh,
                CCCD = model.CCCD,
                NgayCap = model.NgayCap,
                NoiCap = model.NoiCap,
                HeSoLuong = model.HeSoLuong,
                TrangThai = model.TrangThai,
                TrinhDo = model.TrinhDo,
                NgayBatDauLam = model.NgayBatDauLam
            };

            var result = await userManager.CreateAsync(user, model.MatKhau);
            if (!result.Succeeded) return result;

            if (!await roleManager.RoleExistsAsync(UserRole.NhanVien))
            {
                await roleManager.CreateAsync(new IdentityRole(UserRole.NhanVien));
            }
            await userManager.AddToRoleAsync(user, UserRole.NhanVien);

            #region XuLyHinh
            if (model.images != null && model.images.Count > 0)
            {
                foreach (var image in model.images)
                {
                    string url = await _ImageHelper.AddAsync(image, "employeeimg");
                    HinhAnhNhanVien img = new HinhAnhNhanVien()
                    {
                        ImageUrl = url,
                        UserId = user.Id
                    };
                    _context.hinhAnhNhanViens.Add(img);
                }
                await _context.SaveChangesAsync();
            }
            #endregion
            return result;
        }


        public async Task<bool> UpdateInformationAsync(UpdateInformationModel model)
        {
            var userModel = await GetCurrentUser();
            if (userModel == null) return false;

            var user = await userManager.FindByEmailAsync(userModel.Email);
            if (user == null) return false;

            user.HoTen = model.HoTen;
            user.CCCD = model.CCCD;
            user.PhoneNumber = model.SoDt;
            user.GioiTinh = model.GioiTinh;
            user.NgayCap = model.NgayCap;
            user.NoiCap = model.NoiCap;
            user.SoNha = model.SoNha;
            user.Xa = model.Xa;
            user.Huyen = model.Huyen;
            user.Tinh = model.Tinh;
            user.HeSoLuong = model.HeSoLuong;
            user.TrangThai = model.TrangThai;
            user.TrinhDo = model.TrinhDo;
            user.NgayBatDauLam = model.NgayBatDauLam;

            #region XuLyHinh
            if (model.images != null && model.images.Count > 0)
            {
                var deleteImages = _context.hinhAnhNhanViens.Where(d=>d.UserId==user.Id).ToList();
                foreach (var image in deleteImages)
                {
                    await _ImageHelper.DeleteAsync(image.ImageUrl, "employeeimg", user.Id);
                }
                foreach (var file in model.images)
                {
                    if (file.Length > 0)
                    {
                        string url = await _ImageHelper.AddAsync(file, "employeeimg");
                        HinhAnhNhanVien img = new HinhAnhNhanVien()
                        {
                            ImageUrl = url,
                            UserId = user.Id
                        };
                        _context.hinhAnhNhanViens.Add(img);
                    }
                }
            }
            #endregion

            await _context.SaveChangesAsync(); 
            var result = await userManager.UpdateAsync(user);
            return result.Succeeded;
        }

        public async Task<bool> UpdatePasswordAsync(ChangePasswordModel model)
        {
            if (model.MatKhau.Length < 1 || model.MatKhauMoi.Length < 1) return false;

            var userModel = await GetCurrentUser();
            if (userModel == null) return false;

            var user = await userManager.FindByEmailAsync(userModel.Email);
            if (user == null) return false;

            var passwordValid = await userManager.CheckPasswordAsync(user, model.MatKhau);
            if (!passwordValid) return false;

            var changePassword = await userManager.ChangePasswordAsync(user, model.MatKhau, model.MatKhauMoi);
            if (!changePassword.Succeeded) return false;
            return true;
        }

    }
}
