using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ThiTriTueNhanTao.Server.Data
{
    [Table("ChucVu")]
    public class ChucVu
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(100)]
        public string TenChucVu { get; set; } = string.Empty;

        public string? MoTa { get; set; }

        public  ICollection<ChucVuNguoiDung> ChucVuNguoiDungs { get; set; } = new List<ChucVuNguoiDung>();
    }
}
