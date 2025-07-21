using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ThiTriTueNhanTao.Server.Data
{
    [Table("ChiNhanh")]
    public class ChiNhanh
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { set; get; }
        public string TenChiNhanh { set; get; } = string.Empty;
        public string SoNha { set; get; } = string.Empty;
        public string Xa { set; get; } = string.Empty;
        public string Huyen { set; get; } = string.Empty;
        public string Tinh { set; get; } = string.Empty;
        public DateTime NgayTaoChiNhanh { set; get; }
        public ICollection<PhongBan> PhongBans { set; get; } = new List<PhongBan>();
        public ICollection<ChucVuNguoiDung> ChucVuNguoiDungs { get; set; } = new List<ChucVuNguoiDung>();
    }
}
