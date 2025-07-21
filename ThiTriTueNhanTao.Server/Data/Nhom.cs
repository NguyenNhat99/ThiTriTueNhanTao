using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ThiTriTueNhanTao.Server.Data
{
    [Table("Nhom")]
    public class Nhom
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MaNhom { set; get; }
        [MaxLength(255)]
        [Required]
        public string TenNhom { set; get; } = string.Empty;
        public string MoTaNhiemVu { set; get; } = string.Empty;
        public int MaPhongBan { set; get; }
        public  PhongBan? PhongBan { get; set; }
        public ICollection<ChucVuNguoiDung> ChucVuNguoiDungs { get; set; } = new List<ChucVuNguoiDung>();

    }
}
