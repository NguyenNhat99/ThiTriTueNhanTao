using System.ComponentModel.DataAnnotations;

namespace ThiTriTueNhanTao.Server.Model
{
    public class AccountModel
    {
        public string Email { set; get; } = string.Empty;
        public string SoDt { set; get; } = string.Empty;
        public string HoTen { set; get; } = string.Empty;
        public bool GioiTinh { set; get; }
        public string CCCD { set; get; } = string.Empty;
        public DateTime NgayCap { set; get; }
        public string NoiCap { set; get; } = string.Empty;
        public string SoNha { set; get; } = string.Empty;
        public string Xa { set; get; } = string.Empty;
        public string Huyen { set; get; } = string.Empty;
        public string Tinh { set; get; } = string.Empty;
        public float HeSoLuong { set; get; }
        public string TrangThai { set; get; } = string.Empty;
        public string TrinhDo { set; get; } = string.Empty;
        public DateTime NgayBatDauLam { set; get; }
        public string Role { set;get; } = string.Empty;
        public List<string> Images { set; get; } = new List<string>();
    }
    public class SignInModel
    {
        [Required]
        [EmailAddress]
        public string Email { set; get; } = null!;
        [Required]
        public string Password { set; get; } = null!;
    }
    public class SignUpModel {
        public string Email { set; get; } = string.Empty;
        public string MatKhau { set; get; } = null!;
        public string SoDt { set; get; } = string.Empty;
        public string HoTen { set; get; } = string.Empty;
        public bool GioiTinh { set; get; }
        public string CCCD { set; get; } = string.Empty;
        public DateTime NgayCap { set; get; }
        public string NoiCap { set; get; } = string.Empty;
        public string SoNha { set; get; } = string.Empty;
        public string Xa { set; get; } = string.Empty;
        public string Huyen { set; get; } = string.Empty;
        public string Tinh { set; get; } = string.Empty;
        public float HeSoLuong { set; get; }
        public string TrangThai { set; get; } = string.Empty;
        public string TrinhDo { set; get; } = string.Empty;
        public DateTime NgayBatDauLam { set; get; }
        public List<IFormFile> images { set; get; } = new List<IFormFile>();
    }
    public class ChangePasswordModel
    {
        public string MatKhau { get; set; } = string.Empty;
        public string MatKhauMoi { get; set; } = string.Empty;
    }
    public class UpdateInformationModel
    {
        public string Email { set; get; } = string.Empty;
        public string SoDt { set; get; } = string.Empty;
        public string HoTen { set; get; } = string.Empty;
        public bool GioiTinh { set; get; }
        public string CCCD { set; get; } = string.Empty;
        public DateTime NgayCap { set; get; }
        public string NoiCap { set; get; } = string.Empty;
        public string SoNha { set; get; } = string.Empty;
        public string Xa { set; get; } = string.Empty;
        public string Huyen { set; get; } = string.Empty;
        public string Tinh { set; get; } = string.Empty;
        public float HeSoLuong { set; get; }
        public string TrangThai { set; get; } = string.Empty;
        public string TrinhDo { set; get; } = string.Empty;
        public DateTime NgayBatDauLam { set; get; }
        public List<IFormFile> images { set; get; } = new List<IFormFile>();
    }
}
