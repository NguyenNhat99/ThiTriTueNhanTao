using AutoMapper.Configuration.Conventions;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ThiTriTueNhanTao.Server.Data
{
    [Table("PhongBan")]
    public class PhongBan
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]   
        public int Id { set; get; }
        [Required]
        public string TenPhongBan { set; get; } = string.Empty;
        public string MoTa { set; get; } = string.Empty;
        public DateTime NgayTao { set; get; }
        public int MaChiNhanh { set; get; }
        public  ChiNhanh? ChiNhanh { set; get; }
        public ICollection<Nhom> Nhoms { set; get; } = new List<Nhom>();
        public ICollection<ChucVuNguoiDung> ChucVuNguoiDungs { get; set; } = new List<ChucVuNguoiDung>();
    }
}
