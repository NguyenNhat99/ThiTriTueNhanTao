using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ThiTriTueNhanTao.Server.Data
{
    [Table("ChucVuNguoiDung")]
    public class ChucVuNguoiDung
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string UserId { get; set; } = null!;
        public int LuongCoBan { set; get; }
        public DateTime NgayBatDau { get; set; } = DateTime.Now;
        public int ChucVuId { set; get; }
        public int PhongBanId { set; get; }
        public int ChiNhanhId { set; get; }
        public int NhomId { set; get; }
        public User User { get; set; }
        public ChucVu ChucVu { get; set; }
        public PhongBan PhongBan { get; set; }
        public ChiNhanh ChiNhanh { get; set; }
        public Nhom Nhom { get; set; }
    }
}
