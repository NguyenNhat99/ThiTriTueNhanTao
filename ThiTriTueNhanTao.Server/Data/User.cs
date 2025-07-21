using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
namespace ThiTriTueNhanTao.Server.Data
{
    public class User : IdentityUser
    {
        [MaxLength(255)]
        public string HoTen { set; get; } = string.Empty;
        public bool GioiTinh { set; get; }
        [MaxLength(12)]
        public string CCCD { set; get; } = string.Empty;
        public DateTime NgayCap { set; get; }
        [MaxLength(100)]
        public string NoiCap { set; get; } = string.Empty;
        [MaxLength(100)]
        public string SoNha { set; get; } = string.Empty;
        [MaxLength(100)]
        public string Xa { set; get; } = string.Empty;
        [MaxLength(100)]
        public string Huyen { set; get; } = string.Empty;
        [MaxLength(100)]
        public string Tinh { set; get; } = string.Empty;
        public float HeSoLuong { set; get; }
        public string TrangThai { set; get; } = string.Empty;
        [MaxLength(255)]
        public string TrinhDo { set; get; } = string.Empty;
        public DateTime NgayBatDauLam { set; get; }
        public ICollection<ChamCong> ChamCongs { get; set; } = new List<ChamCong>();
        public ICollection<HinhAnhNhanVien> HinhAnhNhanViens { get; set; } = new List<HinhAnhNhanVien>();
        public ICollection<ChucVuNguoiDung> ChucVuNguoiDungs { get; set; } = new List<ChucVuNguoiDung>();

    }
}
